
import React from 'react';
import {
  Home, User, Settings, FileText, BarChart, CreditCard,
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  Plus, Minus, Check, X, Search, Bell, Calendar, Mail,
  Clock, Heart, Star, Edit, Trash, Upload, Download, Link,
  Share, Filter, ArrowUp, ArrowDown, ArrowLeft, ArrowRight
} from 'lucide-react';

export type IconName =
  | 'home' | 'user' | 'settings' | 'file' | 'chart'
  | 'card' | 'chevron-right' | 'chevron-left' | 'chevron-down' | 'chevron-up'
  | 'plus' | 'minus' | 'check' | 'x' | 'search' | 'bell' | 'calendar' | 'mail'
  | 'clock' | 'heart' | 'star' | 'edit' | 'trash' | 'upload' | 'download' | 'link'
  | 'share' | 'filter' | 'arrow-up' | 'arrow-down' | 'arrow-left' | 'arrow-right';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Icon component that renders a Lucide icon based on the name provided
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  className = ''
}) => {
  const iconProps = {
    size,
    color,
    className: `${className} font-poppins`  // Ensure font-family is applied
  };

  switch (name) {
    case 'home':
      return <Home {...iconProps} />;
    case 'user':
      return <User {...iconProps} />;
    case 'settings':
      return <Settings {...iconProps} />;
    case 'file':
      return <FileText {...iconProps} />;
    case 'chart':
      return <BarChart {...iconProps} />;
    case 'card':
      return <CreditCard {...iconProps} />;
    case 'chevron-right':
      return <ChevronRight {...iconProps} />;
    case 'chevron-left':
      return <ChevronLeft {...iconProps} />;
    case 'chevron-down':
      return <ChevronDown {...iconProps} />;
    case 'chevron-up':
      return <ChevronUp {...iconProps} />;
    case 'plus':
      return <Plus {...iconProps} />;
    case 'minus':
      return <Minus {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    case 'x':
      return <X {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'bell':
      return <Bell {...iconProps} />;
    case 'calendar':
      return <Calendar {...iconProps} />;
    case 'mail':
      return <Mail {...iconProps} />;
    case 'clock':
      return <Clock {...iconProps} />;
    case 'heart':
      return <Heart {...iconProps} />;
    case 'star':
      return <Star {...iconProps} />;
    case 'edit':
      return <Edit {...iconProps} />;
    case 'trash':
      return <Trash {...iconProps} />;
    case 'upload':
      return <Upload {...iconProps} />;
    case 'download':
      return <Download {...iconProps} />;
    case 'link':
      return <Link {...iconProps} />;
    case 'share':
      return <Share {...iconProps} />;
    case 'filter':
      return <Filter {...iconProps} />;
    case 'arrow-up':
      return <ArrowUp {...iconProps} />;
    case 'arrow-down':
      return <ArrowDown {...iconProps} />;
    case 'arrow-left':
      return <ArrowLeft {...iconProps} />;
    case 'arrow-right':
      return <ArrowRight {...iconProps} />;
    default:
      return <div className="w-6 h-6 bg-gray-200 rounded-full"></div>;
  }
};

export default Icon;
