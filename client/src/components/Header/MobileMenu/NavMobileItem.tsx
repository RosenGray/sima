import React from 'react';
import { BackpackIcon } from '@radix-ui/react-icons';
import {
  NavMobileItemContainer,
  NavMobileItemHeader,
  NavMobileItemTitle,
  NavMobileItemArrow,
  NavMobileItemSubMenu,
  NavMobileSubItem,
  NavMobileItemSeparator
} from './MobileMenu.styles';

interface NavMobileItemProps {
  label: string;
  subItems: Array<{
    label: string;
    href: string;
  }>;
  isExpanded: boolean;
  onToggle: () => void;
  onSubItemClick: (href: string) => void;
}

export default function NavMobileItem({
  label,
  subItems,
  isExpanded,
  onToggle,
  onSubItemClick
}: NavMobileItemProps) {
  return (
    <NavMobileItemContainer>
      {/* Category Header - Clickable */}
      <NavMobileItemHeader $isExpanded={isExpanded} onClick={onToggle}>
        <NavMobileItemTitle>
          <BackpackIcon width="18" height="18" />
          {label}
        </NavMobileItemTitle>
        <NavMobileItemArrow $isExpanded={isExpanded}>▼</NavMobileItemArrow>
      </NavMobileItemHeader>
      
      {/* Sub-items - Only show if expanded */}
      {isExpanded && (
        <NavMobileItemSubMenu>
          {subItems.map((subItem) => (
            <NavMobileSubItem
              key={subItem.label}
              href={subItem.href}
              onClick={() => onSubItemClick(subItem.href)}
            >
              {subItem.label}
            </NavMobileSubItem>
          ))}
        </NavMobileItemSubMenu>
      )}
      
      {/* Separator */}
      <NavMobileItemSeparator />
    </NavMobileItemContainer>
  );
}
