import React, { useState } from 'react';
import Link from 'next/link';
import { Text } from '@radix-ui/themes';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { 
  MobileMenuOverlay, 
  MobileMenuContainer, 
  NavigationItemsContainer,
  MobileMenuActionsSection,
  MobilePublishAdButton
} from './MobileMenu.styles';
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
        {/* Publish Ad Section */}
        <MobileMenuActionsSection>
          <MobilePublishAdButton asChild variant="solid" size="3">
            <Link href="/publish-ad" onClick={onClose}>
              <PlusCircledIcon width="18" height="18" />
              <Text size="3" weight="bold">
                Разместить объявление
              </Text>
            </Link>
          </MobilePublishAdButton>
        </MobileMenuActionsSection>

        {/* Navigation Items */}
        <NavigationItemsContainer>
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
        </NavigationItemsContainer>
      </MobileMenuContainer>
    </>
  );
}
