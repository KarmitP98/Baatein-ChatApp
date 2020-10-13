import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from "@angular/animations";

export const pushTrigger : AnimationTriggerMetadata =
    trigger( "push", [
        state( "in", style( {
                                transform : "scale(0)"
                            } ) ),
        transition( "void => *", [
            animate( 100, keyframes( [
                                         style( {
                                                    transform : "scale(0)"
                                                } ),
                                         style( {
                                                    transform : "scale(0.25)"
                                                } ),
                                         style( {
                                                    transform : "scale(0.50)"
                                                } ),
                                         style( {
                                                    transform : "scale(0.75)"
                                                } ),
                                         style( {
                                                    transform : "scale(1)"
                                                } )
                                     ] ) )
        ] ),
        state( "out", style( {
                                 transform : "scale(1)"
                             } ) ),
        
        transition( "* => void", [
            animate( 100, keyframes( [
                                         style( {
                                                    transform : "scale(1)"
                                                } ),
                                         style( {
                                                    transform : "scale(0.75)"
                                                } ),
                                         style( {
                                                    transform : "scale(0.5)"
                                                } ),
                                         style( {
                                                    transform : "scale(0.25)"
                                                } ),
                                         style( {
                                                    transform : "scale(0)"
                                                } )
                                     ] ) )
        ] )
    ] );
