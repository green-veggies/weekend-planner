import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActivityCard from '@/components/ActivityCard';
import { Activity } from '@/lib/store';

const mockActivity: Activity = {
  id: '1',
  title: 'Test Activity',
  category: 'Food',
  mood: '😌 Relaxed',
  icon: 'Coffee',
  description: 'A test activity',
  duration: 60
};

describe('ActivityCard', () => {
  it('renders activity information correctly', () => {
    render(<ActivityCard activity={mockActivity} />);
    
    expect(screen.getByText('Test Activity')).toBeInTheDocument();
    expect(screen.getByText('😌 Relaxed')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('A test activity')).toBeInTheDocument();
    expect(screen.getByText('1h 0m')).toBeInTheDocument();
  });

  it('renders add to day buttons for default variant', () => {
    const mockOnAddToDay = jest.fn();
    render(<ActivityCard activity={mockActivity} onAddToDay={mockOnAddToDay} />);
    
    expect(screen.getByText('Add to Saturday')).toBeInTheDocument();
    expect(screen.getByText('Add to Sunday')).toBeInTheDocument();
  });

  it('renders schedule variant without add buttons', () => {
    render(<ActivityCard activity={mockActivity} variant="schedule" />);
    
    expect(screen.queryByText('Add to Saturday')).not.toBeInTheDocument();
    expect(screen.queryByText('Add to Sunday')).not.toBeInTheDocument();
  });

  it('calls onAddToDay when add buttons are clicked', () => {
    const mockOnAddToDay = jest.fn();
    render(<ActivityCard activity={mockActivity} onAddToDay={mockOnAddToDay} />);
    
    screen.getByText('Add to Saturday').click();
    expect(mockOnAddToDay).toHaveBeenCalledWith('saturday');
    
    screen.getByText('Add to Sunday').click();
    expect(mockOnAddToDay).toHaveBeenCalledWith('sunday');
  });

  it('renders compact variant correctly', () => {
    render(<ActivityCard activity={mockActivity} variant="compact" />);
    
    expect(screen.getByText('Test Activity')).toBeInTheDocument();
    expect(screen.getByText('😌 Relaxed')).toBeInTheDocument();
    expect(screen.queryByText('Add to Saturday')).not.toBeInTheDocument();
  });
});
