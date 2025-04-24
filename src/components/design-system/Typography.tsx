
import React from 'react';
import { Card } from "@/components/ui/card";

interface TypographyRowProps {
  name: string;
  weight: string;
  size: string;
  lineHeight: string;
  children: React.ReactNode;
}

function TypographyRow({ name, weight, size, lineHeight, children }: TypographyRowProps) {
  return (
    <div className="bg-[#EBF0F4] rounded-[14px] p-6 mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <div className="lg:col-span-1">
          {children}
        </div>
        <div className="lg:col-span-1 text-center lg:text-left">
          <span className="font-medium text-pcard-dark-blue text-xl">{weight}</span>
        </div>
        <div className="lg:col-span-1 text-center lg:text-left">
          <span className="font-medium text-pcard-dark-blue text-xl">{size}</span>
        </div>
        <div className="lg:col-span-1 text-center lg:text-left">
          <span className="font-medium text-pcard-dark-blue text-xl">{lineHeight}</span>
        </div>
      </div>
    </div>
  );
}

function TypographyHeader() {
  return (
    <div className="bg-white border border-[#CCD7DD] rounded-[14px] p-4 mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <span className="font-medium text-pcard-dark-blue text-xl">Name</span>
        </div>
        <div className="lg:col-span-1 text-center lg:text-left">
          <span className="font-medium text-pcard-dark-blue text-xl">Font Weight</span>
        </div>
        <div className="lg:col-span-1 text-center lg:text-left">
          <span className="font-medium text-pcard-dark-blue text-xl">Font Size</span>
        </div>
        <div className="lg:col-span-1 text-center lg:text-left">
          <span className="font-medium text-pcard-dark-blue text-xl">Line Height</span>
        </div>
      </div>
    </div>
  );
}

export function Typography() {
  return (
    <div className="paycard-container py-12">
      <h1 className="text-4xl font-bold text-pcard-dark-blue mb-8">Typography</h1>
      
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-pcard-dark-blue mb-6">Text Hierarchy</h2>
        <TypographyHeader />
        
        <TypographyRow name="Headline 1" weight="Bold" size="56px" lineHeight="64px">
          <h1 className="text-[56px] leading-[64px] font-bold text-pcard-dark-blue font-poppins">Headline 1</h1>
        </TypographyRow>
        
        <TypographyRow name="Headline 2" weight="Bold" size="44px" lineHeight="52px">
          <h2 className="text-[44px] leading-[52px] font-bold text-pcard-dark-blue font-poppins">Headline 2</h2>
        </TypographyRow>
        
        <TypographyRow name="Headline 3" weight="Bold" size="36px" lineHeight="44px">
          <h3 className="text-[36px] leading-[44px] font-bold text-pcard-dark-blue font-poppins">Headline 3</h3>
        </TypographyRow>
        
        <TypographyRow name="Headline 4" weight="Bold" size="32px" lineHeight="40px">
          <h4 className="text-[32px] leading-[40px] font-bold text-pcard-dark-blue font-poppins">Headline 4</h4>
        </TypographyRow>
        
        <TypographyRow name="Headline 5" weight="Bold" size="24px" lineHeight="32px">
          <h5 className="text-[24px] leading-[32px] font-bold text-pcard-dark-blue font-poppins">Headline 5</h5>
        </TypographyRow>
        
        <TypographyRow name="Headline 6" weight="Bold / Semibold" size="20px" lineHeight="24px">
          <h6 className="text-[20px] leading-[24px] font-bold text-pcard-dark-blue font-poppins">Headline 6</h6>
        </TypographyRow>
        
        <TypographyRow name="Perex" weight="Medium / Semibold / Bold" size="16px" lineHeight="24px">
          <p className="text-[16px] leading-[24px] font-medium text-pcard-dark-blue font-poppins">Perex</p>
        </TypographyRow>
        
        <TypographyRow name="Body" weight="Medium / Bold" size="14px" lineHeight="20px">
          <p className="text-[14px] leading-[20px] font-medium text-pcard-dark-blue font-poppins">Body</p>
        </TypographyRow>
        
        <TypographyRow name="Body Small" weight="Medium / Bold" size="12px" lineHeight="16px">
          <p className="text-[12px] leading-[16px] font-medium text-pcard-dark-blue font-poppins">Body Small</p>
        </TypographyRow>
        
        <TypographyRow name="Link 1" weight="Bold" size="14px" lineHeight="20px">
          <p className="text-[14px] leading-[20px] font-bold text-pcard-dark-blue font-poppins">Link 1</p>
        </TypographyRow>
        
        <TypographyRow name="Link 2" weight="Bold" size="12px" lineHeight="16px">
          <p className="text-[12px] leading-[16px] font-bold text-pcard-dark-blue font-poppins">Link 2</p>
        </TypographyRow>
        
        <TypographyRow name="Link 3" weight="Bold" size="18px" lineHeight="24px">
          <p className="text-[18px] leading-[24px] font-bold text-pcard-dark-blue font-poppins">Link 3</p>
        </TypographyRow>
        
        <TypographyRow name="Button 1" weight="Semibold" size="18px" lineHeight="28px">
          <p className="text-[18px] leading-[28px] font-semibold text-pcard-dark-blue font-poppins">Button 1</p>
        </TypographyRow>
        
        <TypographyRow name="Button 2" weight="Semibold" size="16px" lineHeight="24px">
          <p className="text-[16px] leading-[24px] font-semibold text-pcard-dark-blue font-poppins">Button 2</p>
        </TypographyRow>
        
        <TypographyRow name="Button 3" weight="Semibold" size="14px" lineHeight="20px">
          <p className="text-[14px] leading-[20px] font-semibold text-pcard-dark-blue font-poppins">Button 3</p>
        </TypographyRow>
        
        <TypographyRow name="Input 1" weight="Medium / Semibold" size="14px" lineHeight="20px">
          <p className="text-[14px] leading-[20px] font-medium text-pcard-dark-blue font-poppins">Input 1</p>
        </TypographyRow>
        
        <TypographyRow name="Input 2" weight="Medium" size="12px" lineHeight="16px">
          <p className="text-[12px] leading-[16px] font-medium text-pcard-dark-blue font-poppins">Input 2</p>
        </TypographyRow>
      </div>
      
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-pcard-dark-blue mb-6">Text Hierarchy - Mobile</h2>
        <TypographyHeader />
        
        <TypographyRow name="Headline 1" weight="Bold" size="44px" lineHeight="52px">
          <h1 className="text-[44px] leading-[52px] font-bold text-pcard-dark-blue font-poppins">Headline 1</h1>
        </TypographyRow>
        
        <TypographyRow name="Headline 2" weight="Bold" size="36px" lineHeight="44px">
          <h2 className="text-[36px] leading-[44px] font-bold text-pcard-dark-blue font-poppins">Headline 2</h2>
        </TypographyRow>
        
        <TypographyRow name="Headline 3" weight="Bold" size="32px" lineHeight="40px">
          <h3 className="text-[32px] leading-[40px] font-bold text-pcard-dark-blue font-poppins">Headline 3</h3>
        </TypographyRow>
        
        <TypographyRow name="Headline 4" weight="Bold" size="24px" lineHeight="32px">
          <h4 className="text-[24px] leading-[32px] font-bold text-pcard-dark-blue font-poppins">Headline 4</h4>
        </TypographyRow>
        
        <TypographyRow name="Headline 5" weight="Bold" size="18px" lineHeight="24px">
          <h5 className="text-[18px] leading-[24px] font-bold text-pcard-dark-blue font-poppins">Headline 5</h5>
        </TypographyRow>
        
        <TypographyRow name="Headline 6" weight="Bold" size="16px" lineHeight="24px">
          <h6 className="text-[16px] leading-[24px] font-bold text-pcard-dark-blue font-poppins">Headline 6</h6>
        </TypographyRow>
      </div>
      
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-pcard-dark-blue mb-6">Typeface</h2>
        <div className="bg-[#EBF0F4] rounded-[14px] p-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <span className="font-poppins text-[68px] text-pcard-dark-blue">Poppins</span>
            </div>
            <div className="md:w-2/3 flex justify-between text-center">
              <div className="px-4">
                <span className="font-poppins font-normal text-[22px] text-pcard-dark-blue">Regular</span>
              </div>
              <div className="px-4">
                <span className="font-poppins font-medium text-[22px] text-pcard-dark-blue">Medium</span>
              </div>
              <div className="px-4">
                <span className="font-poppins font-semibold text-[22px] text-pcard-dark-blue">Semibold</span>
              </div>
              <div className="px-4">
                <span className="font-poppins font-bold text-[22px] text-pcard-dark-blue">Bold</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

