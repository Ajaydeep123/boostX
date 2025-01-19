import {
  Cpu,
  Database,
  Globe,
  Globe as Lambda,
  Server,
  HardDrive,
} from 'lucide-react';
export const AWSservices = [
  {
    name: 'EC2 (Elastic Compute Cloud)',
    description: 'Scalable virtual servers for flexible computing capacity.',
    icon: Cpu,
  },
  {
    name: 'S3 (Simple Storage Service)',
    description: 'Secure and scalable object storage for data management.',
    icon: HardDrive,
  },
  {
    name: 'DynamoDB',
    description:
      'Fully managed NoSQL database with fast and predictable performance.',
    icon: Database,
  },
  {
    name: 'RDS (Relational Database Service)',
    description: 'Managed relational databases for seamless data handling.',
    icon: Server,
  },
  {
    name: 'CloudFront',
    description: 'Fast content delivery network for optimal performance.',
    icon: Globe,
  },
  {
    name: 'Lambda',
    description:
      'Serverless computing for executing code in response to events.',
    icon: Lambda,
  },
];

export const BoostServices = [
  {
    image: '/awsService.png',
    title: 'AWS Account Integration',
    description:
      'Easily connect your AWS account for seamless cost tracking and resource management.',
    pageLink: '',
  },
  {
    image: '/awsService.png',
    title: 'Smart Cloud Insights',
    description:
      'Get instant visibility into your current cloud usage, costs, and resource allocation.',
    pageLink: '',
  },
  {
    image: '/awsService.png',
    title: 'Group Buying Optimization',
    description:
      'Join cost-saving groups to leverage collective purchasing power for discounted pricing.',
    pageLink: '',
  },
  {
    image: '/awsService.png',
    title: 'Detailed Cost Explorer',
    description:
      'Track and analyze your AWS expenditures over time with intuitive and easy-to-read charts.',
    pageLink: '',
  },
  {
    image: '/awsService.png',
    title: 'Automated Resource Optimization',
    description:
      'Automatically identify underutilized resources and optimize them for better efficiency.',
    pageLink: '',
  },
  {
    image: '/awsService.png',
    title: 'Custom Alerts & Notifications',
    description:
      'Set alerts for spending thresholds and receive notifications on potential savings opportunities.',
    pageLink: '',
  },
  {
    image: '/awsService.png',
    title: 'No Long-Term Commitment',
    description:
      'Start optimizing your cloud with no contracts or upfront costs—just instant savings.',
    pageLink: '',
  },
];

export const faqs = [
  {
    question: 'What is 100xBoost?',
    answer:
      '100xBoost is a cloud optimization platform that connects to your AWS account and helps you reduce costs through real-time insights, resource optimization, and group buying power.',
  },
  {
    question: 'How does 100xBoost reduce cloud costs?',
    answer:
      '100xBoost analyzes your AWS usage to identify underutilized resources, suggests optimizations, and connects you with cost-saving groups to leverage discounted pricing.',
  },
  {
    question: 'What cloud services does 100xBoost support?',
    answer:
      'Currently, 100xBoost focuses on AWS services and provides detailed insights into billing, usage, and resource allocation for various AWS services.',
  },
  {
    question: 'Is my AWS account data secure with 100xBoost?',
    answer:
      'Yes, 100xBoost uses read-only access through secure IAM roles to retrieve data and implements best practices to ensure your account and data remain secure.',
  },
  {
    question: 'How do I connect my AWS account to 100xBoost?',
    answer:
      "Simply click the 'Connect AWS' button, and 100xBoost will create a read-only IAM role in your account to pull billing and usage data automatically.",
  },
  {
    question: 'What level of access does 100xBoost need to my AWS account?',
    answer:
      '100xBoost requires read-only access to your AWS billing, usage, and resource data. It uses a secure IAM role with policies that restrict it from making any changes to your resources.',
  },
  {
    question: 'Can I track my cloud spending over time?',
    answer:
      'Yes, 100xBoost provides detailed spending reports, including historical and real-time data, allowing you to compare past and current expenditures.',
  },
  {
    question: 'Do I need to be part of a group to benefit from 100xBoost?',
    answer:
      'While joining a group can maximize savings through group buying power, you can still benefit from individual cost optimizations without being part of a group.',
  },
  {
    question: 'How much does it cost to use 100xBoost?',
    answer:
      '100xBoost offers flexible pricing with no long-term contracts. You only pay for the value you receive, with immediate cost savings starting from day one.',
  },
  {
    question: 'Can I cancel at any time?',
    answer:
      'Yes, there are no long-term commitments with 100xBoost. You can disconnect your AWS account or stop using the platform whenever you like.',
  },
  {
    question: 'How does group buying work on 100xBoost?',
    answer:
      'Group buying enables companies to combine their purchasing power to get bulk discounts on AWS services. 100xBoost automatically matches you with groups based on your cloud usage and needs.',
  },
  {
    question: 'What kind of savings can I expect with 100xBoost?',
    answer:
      'Savings vary depending on your current cloud usage, but 100xBoost typically helps users reduce costs by optimizing resource allocation and providing access to discounted group pricing.',
  },
];

export const featureItems = [
  {
    tag: 'Integration',
    title: 'Seamless AWS Integration',
    desc: 'With a simple connection to your AWS account, 100xBoost provides real-time insights into your cloud spending and resource allocation, making it easy to monitor and manage usage.',
    image: 'https://framerusercontent.com/images/AkhwmIxpG19kDofdCqZOXNbBw.png',
  },
  {
    tag: 'Scalability',
    title: 'Scalable Solutions for Any Business',
    desc: "Whether you're a small startup or a large enterprise, 100xBoost scales to meet your needs, offering customized recommendations based on your unique cloud usage.",
    image:
      'https://framerusercontent.com/images/C035WTjq26WdHZwmR1zAssXUVk.png',
  },
  {
    tag: 'Transparency',
    title: 'Effortless Billing Management',
    desc: 'Keep track of your cloud expenditures, with clear comparisons of your costs before and after joining the platform, ensuring total transparency in your cloud spend.',
    image:
      'https://framerusercontent.com/images/3XaL4TeAqkKr15EfDOmt4MbKlE.png',
  },
  {
    tag: 'Collaboration',
    title: 'Group Buying Power',
    desc: 'Maximize savings through group buying opportunities, where you can join forces with other companies to leverage discounted pricing on cloud services.',
    image: 'https://framerusercontent.com/images/AkhwmIxpG19kDofdCqZOXNbBw.png',
  },
  {
    tag: 'Flexibility',
    title: 'No Commitment',
    desc: 'Get started with no upfront costs or long-term contracts. 100xBoost is designed to deliver value quickly, with immediate savings from the moment you connect your cloud account.',
    image:
      'https://framerusercontent.com/images/C035WTjq26WdHZwmR1zAssXUVk.png',
  },
];
