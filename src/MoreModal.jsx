import React from 'react';
import { useTheme } from './ThemeContext.jsx';

function MoreModal({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { icon: 'bi-gear', label: 'Settings', action: () => console.log('Settings') },
    { icon: 'bi-clock-history', label: 'Your activity', action: () => console.log('Activity') },
    { icon: 'bi-bookmark', label: 'Saved', action: () => console.log('Saved') },
    { icon: theme === 'light' ? 'bi-moon-stars' : 'bi-sun', label: 'Switch theme', action: toggleTheme },
    { icon: 'bi-exclamation-circle', label: 'Report a problem', action: () => console.log('Report') },
    { type: 'divider' },
    { icon: 'bi-arrow-repeat', label: 'Switch accounts', action: () => console.log('Switch') },
    { type: 'divider' },
    { icon: 'bi-box-arrow-right', label: 'Log out', action: () => console.log('Logout'), danger: true }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className='modal-overlay' onClick={onClose}></div>
      <div className='more-modal'>
        {menuItems.map((item, index) => {
          if (item.type === 'divider') {
            return <div key={index} className='more-divider'></div>;
          }

          return (
            <div 
              key={index} 
              className={`more-item ${item.danger ? 'danger' : ''}`}
              onClick={() => {
                item.action();
                if (item.label !== 'Switch appearance') {
                  onClose();
                }
              }}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
              {item.label === 'Switch appearance' && (
                <i className="bi bi-chevron-right ms-auto"></i>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MoreModal;
