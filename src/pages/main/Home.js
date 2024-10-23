import React from 'react';
import { MainContainer } from '../../components/Containers';
import image from '../../assets/images/homepage-image.png';

const Home = () => {
    return (
        <MainContainer title="Welcome to Sakila Movies">
            <h1 className='home' style={{textAlign: "center"}}>Explore the World of Cinema</h1>
            <div>
                <img
                    src={image}
                    alt="Cinema world"
                    style={{
                        float: 'left',
                        width: '320px',
                        height: 'auto',
                        marginRight: '20px',
                        marginBottom: '5px',
                        borderRadius: '8px'
                    }}
                />
                <p className='home'>
                    &emsp;&emsp;Dive into an extensive collection of films from the renowned Sakila database. 
                    Our website brings you a comprehensive selection of movies from various genres, 
                    including timeless classics, thrilling action adventures, heartwarming dramas, 
                    and much more. Each movie entry is meticulously curated to provide detailed 
                    information and captivating insights, ensuring you have access to a rich source of 
                    cinematic experiences. Whether you're a devoted cinephile or just looking for 
                    a new movie to watch, Sakila Movies offers a treasure trove of options.
                </p>
            </div>
            
            <p className='home'>
                &emsp;&emsp;At Sakila Movies, we believe in celebrating the art of filmmaking through an 
                engaging and user-friendly platform. Our catalog is regularly updated with 
                both the latest releases and all-time favorites, so you'll always find something 
                fresh and exciting. From exploring blockbuster hits to discovering hidden gems, 
                our database provides a diverse range of films to suit every taste and preference.
            </p>
            <p className='home'>
                &emsp;&emsp;Join us in our cinematic journey as we bring you closer to the magic of movies. 
                With intuitive navigation and a wealth of information at your fingertips, 
                exploring our movie catalog is a breeze. Start your adventure today and let Sakila 
                Movies guide you through an unforgettable world of film and entertainment. 
                Your next favorite movie is just a click away!
            </p>
        </MainContainer>
    );
};

export default Home;
