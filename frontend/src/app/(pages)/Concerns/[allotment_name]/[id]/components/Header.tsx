'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');
  const params = useParams();
  const { allotment_name, id } = params as { allotment_name: string; id: string };
  const [title, setPostTitle] = useState<string>('');
  useEffect(() => {

    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );

  fetch(`/backend/concern?allotmentName=${decodeURIComponent(allotment_name)}&id=${id}`)
  .then((res) => res.json())
  .then((post) => {
    if (post?.title) {
      setPostTitle(post.title);
    }
  })
  .catch((err) => {
    console.error('Error fetching title:', err);
  });

  }, []);

  const status = 'Solved';
  const dateLabel = 'Required';
  const concernInfo = 'Community Garden Maintenance';
  const badges = [
    { icon: '👀', bgColor: '#4A61C0' },
    { icon: '🌳', bgColor: '#2E6C3A' }, 
  ];


  return (
    <div className="mb-12 flex flex-col gap-y-3">
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start flex-1">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-x-4 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="truncate">{title}</span>
            <span className="px-3 py-1 rounded-lg bg-green-100 text-green-800 text-sm font-medium whitespace-nowrap">
              {status}
            </span>
          </h1>

          <p className="text-gray-600 text-sm flex items-center mt-2">
            {dateLabel} {currentDate}
            <span className="ml-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
              {concernInfo}
            </span>
          </p>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="flex items-center gap-2">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="px-2 py-1 opacity-70 rounded-lg text-md text-white select-none"
              style={{ backgroundColor: badge.bgColor }}
            >
              {badge.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
