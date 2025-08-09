import React, { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { MobileMenuOverlay, MobileMenuContainer } from './MobileMenu.styles';
import NavMobileItem from './NavMobileItem';

interface NavigationItem {
  label: string;
  subItems: Array<{
    label: string;
    href: string;
  }>;
}

interface MobileMenuProps {
  isOpen: boolean;
  navigationItems: NavigationItem[];
  onClose: () => void;
}

export default function MobileMenu({ isOpen, navigationItems, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryLabel: string) => {
    setExpandedCategory(expandedCategory === categoryLabel ? null : categoryLabel);
  };

  const handleSubItemClick = (href: string) => {
    console.log(`Navigate to: ${href}`);
    onClose();
    setExpandedCategory(null);
  };

  const handleOverlayClick = () => {
    onClose();
    setExpandedCategory(null);
  };

  // Reset expanded category when menu closes
  React.useEffect(() => {
    if (!isOpen) {
      setExpandedCategory(null);
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay $isOpen={isOpen} onClick={handleOverlayClick} />

      {/* Mobile Menu Container */}
      <MobileMenuContainer $isOpen={isOpen}>
        <Flex direction="column" p="4">
          {navigationItems.map((item) => (
            <NavMobileItem
              key={item.label}
              label={item.label}
              subItems={item.subItems}
              isExpanded={expandedCategory === item.label}
              onToggle={() => toggleCategory(item.label)}
              onSubItemClick={handleSubItemClick}
            />
          ))}
        </Flex>
      </MobileMenuContainer>
    </>
  );
}
