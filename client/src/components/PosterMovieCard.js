import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import Rating from './Rating';
import '../styles/PosterMovieCard.css';
import { createImageSrc } from '../api/config/image';
import { formatDate } from '../utils/date';

function PosterMovieCard({ movie, className = '' }) {
    const {
        id,
        title,
        release_date: date,
        poster_path: image,
        vote_average: rating
    } = movie;

    return (
        <Card
            as={Link}
            to={`/movie/${id}`}
            className={`PosterMovieCard ${className}`}
            fluid
        >
            <Image
                className='PosterMovieCard__image'
                src={createImageSrc({ path: image, type: 'poster', size: 'w500' })}
            />
            <Card.Content>
                <Card.Header>
                    <div className='PosterMovieCard__title' title={title}>{title}</div>
                </Card.Header>
                <Card.Meta>
                    <div className='PosterMovieCard__date'>{formatDate(date)}</div>
                    <div className='PosterMovieCard__rating'>
                        <Rating value={rating.toFixed(1)} />
                    </div>
                </Card.Meta>
            </Card.Content>
        </Card>
    );
}

export default PosterMovieCard;
