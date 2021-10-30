/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.usa.reto3.servicios;
import co.edu.usa.reto3.modelo.Reservaciones;
import co.edu.usa.reto3.modelo.custom.CountCategoria;
import co.edu.usa.reto3.modelo.custom.DescriptionAmount;
import co.edu.usa.reto3.repositorios.RepositorioReservaciones;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Erik
 * fecha: 26/10/21
 * 
 */
@Service
public class ServiciosReservaciones {
     @Autowired
     //cracion d un objeto del repositorio
    private RepositorioReservaciones metodosCrud;

     
     // metodo lista de reservaciones 
    public List<Reservaciones> getAll(){
        return metodosCrud.getAll();
    }
    //creacion de metodo de obtener
    public Optional<Reservaciones> getReservation(int reservationId) {
        return metodosCrud.getReservation(reservationId);
    }
    //creacion del metodo guardar
    public Reservaciones save(Reservaciones reservation){
        if(reservation.getIdReservation()==null){
            return metodosCrud.save(reservation);
        }else{
            Optional<Reservaciones> e= metodosCrud.getReservation(reservation.getIdReservation());
            if(e.isEmpty()){
                return metodosCrud.save(reservation);
            }else{
                return reservation;
            }
        }
    }
    //creacion del metodo actualizar
    public Reservaciones update(Reservaciones reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservaciones> e= metodosCrud.getReservation(reservation.getIdReservation());
            if(!e.isEmpty()){

                if(reservation.getStartDate()!=null){
                    e.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus()!=null){
                    e.get().setStatus(reservation.getStatus());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return reservation;
            }
        }else{
            return reservation;
        }
    }
    
    //metopdo borrar
    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    
    public List<Reservaciones> getPapeleriaPeriod(String d1, String d2){

        // yyyy-MM-dd
        SimpleDateFormat parser=new SimpleDateFormat("yyyy-MM-dd");
        Date dateOne=new Date();
        Date dateTwo=new Date();
        try {
            dateOne=parser.parse(d1);
            dateTwo=parser.parse(d2);
        }catch (ParseException e) {
            e.printStackTrace();
        }
        if(dateOne.before(dateTwo)){
            return metodosCrud.getPapeleriaPeriod(dateOne,dateTwo);
        }else{
            return new ArrayList<>();
        }
    }
    
     public List<CountCategoria> getTopCategorias(){
        return metodosCrud.getTopCategorias();
    }

    public DescriptionAmount getStatusReport(){
        List<Reservaciones> completed=metodosCrud.getPapeleriasByDescription("completed");
        List<Reservaciones> cancelled=metodosCrud.getPapeleriasByDescription("cancelled");

        DescriptionAmount descAmt=new DescriptionAmount(completed.size(),cancelled.size());
        return descAmt;
    }
    
    
}
