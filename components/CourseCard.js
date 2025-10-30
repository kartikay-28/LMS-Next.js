'use client';

import Link from 'next/link';

export default function CourseCard({ 
  title, 
  instructor, 
  progress = 0, 
  description, 
  duration, 
  level = 'Beginner',
  courseId,
  imageUrl,
  isEnrolled = false 
}) {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Course Image */}
      <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">
              {title?.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Level Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            level === 'Beginner' ? 'bg-green-100 text-green-800' :
            level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {level}
          </span>
        </div>

        {/* Enrollment Status */}
        {isEnrolled && (
          <div className="absolute top-4 left-4">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              Enrolled
            </span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 mb-3">
          by <span className="font-medium text-indigo-600">{instructor}</span>
        </p>

        {/* Description */}
        {description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {/* Duration */}
        {duration && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </div>
        )}

        {/* Progress Bar (only show if enrolled and progress > 0) */}
        {isEnrolled && normalizedProgress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{normalizedProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${normalizedProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          {isEnrolled ? (
            <Link
              href={`/courses/${courseId}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 text-center"
            >
              Continue Learning
            </Link>
          ) : (
            <div className="flex space-x-2 flex-1">
              <Link
                href={`/courses/${courseId}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 text-center"
              >
                View Details
              </Link>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Enroll
              </button>
            </div>
          )}
        </div>

        {/* Course Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Updated recently</span>
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}