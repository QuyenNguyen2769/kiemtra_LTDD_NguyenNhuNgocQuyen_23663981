import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard, { Movie } from '../src/components/MovieCard';

describe('MovieCard Component', () => {
  const mockMovie: Movie = {
    id: 'm1',
    title: 'Biệt Đội Siêu Anh Hùng',
    poster: 'poster-url',
    genre: 'Action',
    year: 2012,
    rating: 8,
    isShowing: true
  };

  it('render đúng tên phim và điểm đánh giá', async () => {
    const { getByText } = await render(
      <MovieCard movie={mockMovie} onSelect={jest.fn()} layout="row" />
    );

    // Tên phim
    expect(getByText('Biệt Đội Siêu Anh Hùng')).toBeTruthy();
    // Điểm đánh giá (phải format 1 chữ số thập phân)
    expect(getByText('⭐ 8.0')).toBeTruthy();
  });

  it('layout="row" có hiển thị thể loại, layout="tile" ẩn thể loại', async () => {
    // Test layout="row"
    const { getByText, rerender, queryByText } = await render(
      <MovieCard movie={mockMovie} onSelect={jest.fn()} layout="row" />
    );
    expect(getByText('Action • 2012')).toBeTruthy();

    // Test layout="tile"
    await rerender(<MovieCard movie={mockMovie} onSelect={jest.fn()} layout="tile" />);
    expect(queryByText('Action • 2012')).toBeNull();
  });

  it('hiển thị trạng thái đang chiếu / ngừng chiếu', async () => {
    const { getByText, rerender } = await render(
      <MovieCard movie={mockMovie} onSelect={jest.fn()} layout="row" />
    );
    // isShowing = true
    expect(getByText('🟢 Đang chiếu')).toBeTruthy();

    // isShowing = false
    const offMovie = { ...mockMovie, isShowing: false };
    await rerender(<MovieCard movie={offMovie} onSelect={jest.fn()} layout="row" />);
    expect(getByText('🔴 Ngừng chiếu')).toBeTruthy();
  });

  it('gọi hàm onSelect khi nhấn', async () => {
    const mockOnSelect = jest.fn();
    const { getByText } = await render(
      <MovieCard movie={mockMovie} onSelect={mockOnSelect} layout="row" />
    );

    const card = getByText('Biệt Đội Siêu Anh Hùng');
    fireEvent.press(card);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith('m1');
  });
});
