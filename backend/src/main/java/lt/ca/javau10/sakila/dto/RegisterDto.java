package lt.ca.javau10.sakila.dto;

import java.util.Objects;

public class RegisterDto {
	
    private String firstName;
    private String lastName;
    private String email;
    private Byte storeId;
    private String username;
    private String password;
    
	public RegisterDto() {}

	public RegisterDto(String firstName, String lastName, String email, Byte storeId, String username, String password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.storeId = storeId;
		this.username = username;
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Byte getStoreId() {
		return storeId;
	}

	public void setStoreId(Byte storeId) {
		this.storeId = storeId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public int hashCode() {
		return Objects.hash(email, username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RegisterDto other = (RegisterDto) obj;
		return Objects.equals(email, other.email) && Objects.equals(username, other.username);
	}
}
