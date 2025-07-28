import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { useApp } from '../context/AppContext';
import { logoutUser } from '../../lib/auth';

export default function UserDropdown() {
  const { user } = useAuth();
  const { state, dispatch } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
       dispatch({ type: 'TOGGLE_DROPDOWN' })
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  if (!user || !state.isAuthOpen) return null;

  return (
    <div
      onClick={() => dispatch({type: 'TOGGLE_DROPDOWN'})}
      ref={dropdownRef}
      className="absolute right-4 top-[4.5rem] w-48 bg-[#f5efe0] text-[#a87b3b] rounded-lg shadow-lg p-4 z-50 space-y-3"
    >
      <Link
        to="/profile"
        className="block hover:underline"
        onClick={() => dispatch({ type: 'TOGGLE_DROPDOWN' })}
      >
        Profile
      </Link>
      <Link
        to="/orders"
        className="block hover:underline"
        onClick={() => dispatch({ type: 'TOGGLE_DROPDOWN' })}
      >
        Your Orders
      </Link>
      <button
        onClick={async () => {
          await logoutUser();
          dispatch({ type: 'TOGGLE_DROPDOWN' });
        }}
        className="block text-left w-full hover:underline"
      >
        Sign Out
      </button>
    </div>
  );
}
