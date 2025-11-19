import React from 'react';

export const CardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
  </div>
);

export const ListSkeleton = ({ count = 3 }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </>
);
