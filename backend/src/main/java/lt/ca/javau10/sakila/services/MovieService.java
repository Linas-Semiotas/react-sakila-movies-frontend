package lt.ca.javau10.sakila.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.ca.javau10.sakila.dto.MovieDto;
import lt.ca.javau10.sakila.entities.Movie;
import lt.ca.javau10.sakila.repositories.MovieRepository;
import lt.ca.javau10.sakila.utils.Utils;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;
    
    public List<MovieDto> getAllMovies() {
        List<Movie> films = repository.findAll();
        return films.stream()
        			.map(this::convertToDto)
                    .collect(Collectors.toList());
    }

	public MovieDto getMovieById(Short id) {
        return repository.findById(id)
    				.map(this::convertToDto)
        			.orElse(null);
	}
    
    private MovieDto convertToDto(Movie movie) {
        List<String> actors = movie.getActor().stream()
        		.map(actor -> Utils.capitalize(actor.getFirstName()) + " " + Utils.capitalize(actor.getLastName()))
	            .collect(Collectors.toList());
        return new MovieDto(
    		movie.getId(),
    		Utils.capitalize(movie.getTitle()),
    		movie.getDescription(),
            movie.getReleaseYear(),
            movie.getFilmLength(),
            movie.getRating(),            
            movie.getLanguage().getName(),
            movie.getCategory().getName(),
            actors
        );
    }
    
    public List<MovieDto> getMoviesByDescription(String description) {
        return repository.findByDescriptionContaining(description);
    }
}
