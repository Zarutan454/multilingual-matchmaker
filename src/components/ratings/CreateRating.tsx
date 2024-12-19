import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { RatingCriteria } from '@/types/ratings';

interface CreateRatingProps {
  providerId: string;
  onRatingCreated?: () => void;
}

export const CreateRating = ({ providerId, onRatingCreated }: CreateRatingProps) => {
  const { t } = useLanguage();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [criteria, setCriteria] = useState<RatingCriteria>({
    communication: 5,
    cleanliness: 5,
    accuracy: 5,
    value: 5,
    location: 5,
    overall: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('ratings')
        .insert({
          provider_id: providerId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          rating: rating,
          criteria: criteria,
          comment: comment,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success(t('ratingSubmitted'));
      onRatingCreated?.();
      
      // Reset form
      setRating(5);
      setComment('');
      setCriteria({
        communication: 5,
        cleanliness: 5,
        accuracy: 5,
        value: 5,
        location: 5,
        overall: 5
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error(t('errorSubmittingRating'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          {t('overallRating')}
        </label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          {t('comment')}
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/80 transition-colors"
      >
        {t('submitRating')}
      </button>
    </form>
  );
};