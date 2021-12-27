import { animate, AnimationTriggerMetadata, query, stagger, style, transition, trigger } from "@angular/animations";

export const loadOpacity : AnimationTriggerMetadata = trigger( "loadOpacity", [
    transition( "void <=> *", [ style( { opacity : 0 } ), animate( 250, style( { opacity : 1 } ) ) ] )
] );

export const loadStory : AnimationTriggerMetadata = trigger( "loadStory", [
    transition( "* => *", [ // each time the binding value changes
        query( ":leave", [
            stagger( 100, [
                animate( "0.5s", style( { opacity : 0 } ) )
            ] )
        ] ),
        query( ":enter", [
            style( { opacity : 0 } ),
            stagger( 100, [
                animate( "0.5s", style( { opacity : 1 } ) )
            ] )
        ] )
    ] )
] );
