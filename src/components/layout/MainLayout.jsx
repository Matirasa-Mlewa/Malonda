import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useNotifications } from '../../context/NotificationContext';

const navItems = [
  { path: '/', icon: '🏠', label: 'Home', exact: true },
  { path: '/search', icon: '🔍', label: 'Explore' },
  { path: '/cart', icon: '🛒', label: 'Cart', showBadge: 'cart' },
  { path: '/orders', icon: '📦', label: 'Orders' },
  { path: '/profile', icon: '👤', label: 'Profile', showBadge: 'notif' },
];

export default function MainLayout() {
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const location = useLocation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, paddingBottom: 64 }}>
        <Outlet />
      </main>

      <nav className="bottom-nav">
        {navItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);
          const badge =
            item.showBadge === 'cart' && itemCount > 0
              ? itemCount
              : item.showBadge === 'notif' && unreadCount > 0
              ? unreadCount
              : null;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-item${isActive ? ' active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              <span className="nav-icon" style={{ position: 'relative' }}>
                {item.icon}
                {badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -6,
                      background: '#c0392b',
                      color: 'white',
                      borderRadius: '50%',
                      minWidth: 15,
                      height: 15,
                      fontSize: 9,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      padding: '0 2px',
                    }}
                  >
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
