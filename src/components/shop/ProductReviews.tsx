'use client';

import { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Review } from '@/types/product';

interface ProductReviewsProps {
  productId: string;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    rating: 5,
    title: 'Amazing product!',
    comment: 'This skincare set has completely transformed my skin. The quality is exceptional and the results are visible within just a few weeks.',
    helpful: 12,
    verified: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    userName: 'Mike Chen',
    userEmail: 'mike@example.com',
    rating: 4,
    title: 'Great value for money',
    comment: 'Really impressed with the packaging and quality. My wife loves it!',
    helpful: 8,
    verified: true,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    productId: '1',
    userId: '3',
    userName: 'Emma Wilson',
    userEmail: 'emma@example.com',
    rating: 5,
    title: 'Perfect for sensitive skin',
    comment: 'I have very sensitive skin and this set works perfectly. No irritation at all and my skin feels amazing.',
    helpful: 15,
    verified: true,
    createdAt: '2024-01-08'
  }
];

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    userName: '',
    userEmail: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const productReviews = sampleReviews.filter(review => review.productId === productId);
      setReviews(productReviews);
      setLoading(false);
    }, 500);
  }, [productId]);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log('New review:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 0, title: '', comment: '', userName: '', userEmail: '' });
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-24 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rating Summary */}
            <div>
              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold text-gray-900 mr-3">
                  {averageRating.toFixed(1)}
                </span>
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-6">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%`, transition: 'width 0.3s ease' }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Write Review Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-[#450209] text-white px-6 py-3 rounded-lg hover:bg-[#5a0a0a] transition-colors font-medium"
              >
                Write a Review
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-[#450209] text-white px-6 py-3 rounded-lg hover:bg-[#5a0a0a] transition-colors font-medium"
            >
              Write the First Review
            </button>
          </div>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReview.userName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#450209]"
                  placeholder="Enter your name"
                  aria-label="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={newReview.userEmail}
                  onChange={(e) => setNewReview(prev => ({ ...prev, userEmail: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#450209]"
                  placeholder="Enter your email"
                  aria-label="Your email address"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                    className="focus:outline-none"
                    aria-label={`Rate ${rating} stars`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= newReview.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title *
              </label>
              <input
                type="text"
                required
                value={newReview.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#450209]"
                placeholder="Give your review a title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                required
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#450209]"
                placeholder="Share your experience with this product"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-[#450209] text-white px-6 py-2 rounded-lg hover:bg-[#5a0a0a] transition-colors font-medium"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium text-gray-900">{review.title}</h4>
                  <p className="text-sm text-gray-600">
                    By {review.userName} • {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{review.comment}</p>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful ({review.helpful})
                </button>
                <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  Not Helpful
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}