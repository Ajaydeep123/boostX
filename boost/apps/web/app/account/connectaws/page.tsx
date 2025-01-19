'use client';
import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaAws } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CloudformationStatus } from '../../../types/CloudformationStatus.types';
import { useRouter } from 'next/navigation';

export default function OnboardingModal() {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkOpened, setIsLinkOpened] = useState(false);
  const router = useRouter();
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleConnectAWS = async () => {
    if (!isChecked) {
      toast.error('Please accept the privacy policy');
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.get(
        '/api/account/createLink?role_type=READONLY',
      );
      const data = await response.data;
      if (response.status < 400 && data.data && data.data.link) {
        window.open(data.data.link, '_blank', 'noopener,noreferrer');
        setIsLinkOpened(true);
      } else {
        console.error('Failed to get link:', data.message || 'Unknown error');
        alert('Failed to generate AWS link. Please try again later.');
        setIsLinkOpened(false);
      }
    } catch (error) {
      console.error('Error getting link:', error);
      alert('An error occurred. Please try again later.');
      setIsLinkOpened(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isLinkOpened) {
      toast.success('CloudFormation link generated successfully');
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.get('/api/pingbackservice/hasCreated', {
            signal,
          });
          const details = await response.data;
          if (
            response.status < 400 &&
            details.data &&
            details.data.hasCreated
          ) {
            if (details.data.hasCreated == CloudformationStatus.SUCCESS) {
              toast.success('Stack created successfully');
              router.push('/dashboard');
              clearInterval(intervalId);
            }
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error checking stack status:', error);
          }
        }
      }, 5000);
      return () => {
        clearInterval(intervalId);
        if (abortControllerRef.current) {
          abortControllerRef.current?.abort();
        }
      };
    }
  }, [isLinkOpened, router]);
  const handleReset = () => {
    setIsLoading(false);
    setIsLinkOpened(false);
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
      toast.info('Connection reset. You can start over if needed.');
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 p-4">
        <div className="w-full max-w-2xl rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <FaSearch className="text-4xl text-zinc-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              View Estimated Savings
            </h3>
            <p className="mb-4 text-zinc-400">
              Easily unlock potential savings by connecting your AWS account.
              All we need is
              <span className="font-medium">read-only IAM permissions</span> to
              your management account, enabling us to provide you with a
              personalized savings estimate.
            </p>
            <a href="#" className="text-indigo-600 hover:underline">
              For more information or privacy concerns, please click here.
            </a>
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="privacy"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mr-2"
            />
            <label htmlFor="privacy" className="text-sm text-zinc-400">
              Please keep my data private as per{' '}
              <span className="font-medium">mutual NDA</span> to 100xboost.
            </label>
          </div>

          <div className="flex justify-center space-x-4">
            {isLinkOpened ? (
              <button
                className="flex items-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleReset}
              >
                Cancel
              </button>
            ) : (
              <button
                className={`flex items-center rounded-md px-4 py-2 ${
                  isLoading
                    ? 'cursor-not-allowed bg-gray-500'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
                onClick={handleConnectAWS}
                disabled={isLoading}
              >
                <FaAws className="mr-2" />
                {isLoading ? 'Connecting...' : 'Connect AWS'}
              </button>
            )}
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            {isLinkOpened
              ? "Please complete the stack creation in the new tab. Click 'Cancel' if you need to start over."
              : isLoading
                ? 'Opening AWS CloudFormation page...'
                : 'Please note clicking "Connect AWS" will take you to the AWS CloudFormation page.'}
          </p>
        </div>
      </div>
    </>
  );
}
