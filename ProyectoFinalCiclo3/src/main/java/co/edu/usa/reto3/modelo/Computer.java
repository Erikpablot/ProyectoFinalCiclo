/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.reto3.modelo;
/*
autor:Erik
fecha: 21/10/21


*/


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/*creacion de la tabla computer en la base de datos
*
*fgh
*/
@Entity
@Table(name = "computer")
/*clase computer
*
*/
public class Computer implements Serializable{ /*clase publica */
    /*Atributos de la clase computer, marcando su respectivo id y haciendo esste incremental
    *
    *
    *
    */
    @Id
    /*
    *Incrementador
    */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /*
    variables
    */
    private Integer id;
    private String name;
    private String brand;
    private Integer year;
    private String description;

    
    
    /*Conexion de tablas de category a computers
    *
    *
    */
    @ManyToOne
    /*
    *creacion de columna categoria
    */
    @JoinColumn(name = "category")
    /*
    *json
    */
    @JsonIgnoreProperties("computers")
    /*
    *creacion de objetos
    */
    private Categoria category;

    
    /*conexion de tablas computer y client
    *
    *
    */
     @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "computer")
     /*
     *el json
     */
    @JsonIgnoreProperties({"computer", "client"})
     /*
     *creacion de objeto
     */
    private List<Mensaje> messages;

     
     /*metodo de computer y reservation
     *
     *
     */
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "computer")
    /*
    *json
    */
    @JsonIgnoreProperties({"computer", "client"})
    /*
    *creacion json
    */
    private List<Reservaciones> reservations;

    
    /*Metodos getter and setter
    *
    *
    */
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Categoria getCategory() {
        return category;
    }

   
    public void setCategory(Categoria category) {
        this.category = category;
    }

    public List<Mensaje> getMessages() {
        return messages;
    }

    public void setMessages(List<Mensaje> messages) {
        this.messages = messages;
    }

    public List<Reservaciones> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservaciones> reservations) {
        this.reservations = reservations;
    }

}
