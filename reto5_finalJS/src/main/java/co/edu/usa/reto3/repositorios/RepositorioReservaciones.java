/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.reto3.repositorios;
import co.edu.usa.reto3.modelo.Cliente;
import co.edu.usa.reto3.modelo.Reservaciones;
import co.edu.usa.reto3.modelo.custom.CountCategoria;
import co.edu.usa.reto3.repositorio.crud.InterfaceReservaciones;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author USUARIO
 */
@Repository
public class RepositorioReservaciones {
       @Autowired
    private InterfaceReservaciones crud4;

    public List<Reservaciones> getAll(){
        return (List<Reservaciones>) crud4.findAll();
    }
    public Optional<Reservaciones> getReservation(int id){
        return crud4.findById(id);
    }
    public Reservaciones save(Reservaciones reservation){
        return crud4.save(reservation);
    }
    public void delete(Reservaciones reservation){
        crud4.delete(reservation);
    }
     public List<Reservaciones> getPapeleriaPeriod(Date dateOne, Date dateTwo){
        return crud4.findAllByStartDateAfterAndStartDateBefore(dateOne,dateTwo);
    }
     
     public List<CountCategoria> getTopCategorias(){
        List<CountCategoria> res=new ArrayList<>();

        List<Object[]> report=crud4.countTotalReservationsByClient();
        for(int i=0;i<report.size();i++){
            
            /*Categoria cat=(Categoria) report.get(i)[0];
            Long cantidad=(Long) report.get(i)[1];
            CountCategoria cc=new CountCategoria(cantidad,cat);
            res.add(cc);*/
            
            res.add(new CountCategoria((Long) report.get(i)[1],(Cliente)report.get(i)[0] ));
        }
        return res;
    }
     
     
      public List<Reservaciones> getPapeleriasByDescription(String description){
        return crud4.findAllByStatus(description);
    }
}
