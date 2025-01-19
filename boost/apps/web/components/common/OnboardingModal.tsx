'use client';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CloudformationStatus } from '../../types/CloudformationStatus.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { DollarSign } from 'lucide-react';
import { useDialog } from '../../store/onboardingmodalstore';
import { useOnboardingStatus } from '../../store/onboardingmodalstore';
export default function OnboardingModal() {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkOpened, setIsLinkOpened] = useState(false);
  const router = useRouter();
  const abortControllerRef = useRef<AbortController | null>(null);
  const { isOpen, onClose } = useDialog();
  const { setIsOnboardingComplete } = useOnboardingStatus();
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
        toast.error('Failed to generate AWS link. Please try again later.');
        setIsLinkOpened(false);
      }
    } catch (error) {
      console.error('Error getting link:', error);
      toast.error('An error occurred. Please try again later.');
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
              setIsOnboardingComplete();
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
  }, [isLinkOpened, router, setIsOnboardingComplete]);

  const handleReset = () => {
    console.log('handleReset Called');
    setIsLoading(false);
    setIsLinkOpened(false);
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
      toast.info('Connection reset. You can start over if needed.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className="bg-white text-gray-900 sm:max-w-[425px] dark:bg-[#13151A] dark:text-white">
        <DialogHeader>
          <DialogTitle>Connect with AWS</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Easily unlock potential savings by connecting your AWS account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <DollarSign className="h-12 w-12 text-[#D591FE]" />
          </div>
          <h3 className="text-center text-lg font-semibold">
            View Estimated Savings
          </h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            All we need is read-only IAM permissions to your management account,
            enabling us to provide you with a personalized savings estimate.
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked as boolean)}
              className="border-gray-200 data-[state=checked]:border-[#D591FE] data-[state=checked]:bg-[#D591FE] dark:border-gray-800"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Please keep my data private as per mutual NDA to 100xBoost
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline">Book a demo</Button>
          {isLinkOpened ? (
            <Button variant="destructive" onClick={handleReset}>
              Cancel
            </Button>
          ) : (
            <Button
              className="bg-[#D591FE] text-gray-900 hover:bg-[#F8DAFE] dark:bg-[#D591FE] dark:hover:bg-[#F8DAFE]"
              onClick={handleConnectAWS}
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect AWS'}
            </Button>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          {isLinkOpened
            ? "Please complete the stack creation in the new tab. Click 'Cancel' if you need to start over."
            : isLoading
              ? 'Opening AWS CloudFormation page...'
              : 'Please note clicking "Connect AWS" will take you to the AWS CloudFormation page.'}
        </p>
      </DialogContent>
    </Dialog>
  );
}
