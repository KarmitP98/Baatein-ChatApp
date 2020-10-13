import { Pipe, PipeTransform } from "@angular/core";

@Pipe( {
         name : "initial"
       } )
export class InitialPipe implements PipeTransform {
  
  transform( value : string, ...args : string[] ) : string {
    return value.slice( 0, 1 );
  }
  
}
