port module Im exposing (main)

{-| If you are new to Elm, I highly recommend checking out
this guide:

    http://guide.elm-lang.org

It gives a pretty complete overview of how Elm works. For an
abbreviated read, focus on "The Elm Architecture" chapter.

    http://guide.elm-lang.org/architecture

It introduces key concepts gradually until you get to a chat
room very similar to the one here.
-}

import Html exposing (..)


main : Program String Model Msg
main =
    Html.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { input : String
    , messages : List String
    }


init : String -> ( Model, Cmd Msg )
init model =
    ( Model "" [], Cmd.none )



-- UPDATE


type Msg
    = Send
    | UpdateCounter Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ input, messages } as model) =
    case msg of
        Send ->
            ( model, output (model.messages) )

        UpdateCounter counter ->
            let
                addedOne =
                    counter + 1

                m =
                    { model | input = input ++ (toString addedOne), messages = (toString addedOne) :: messages }
            in
                update Send m



-- SUBSCRIPTIONS


port counter : (Int -> msg) -> Sub msg


port output : List String -> Cmd msg


subscriptions : Model -> Sub Msg
subscriptions { input } =
    Sub.batch
        [ counter UpdateCounter ]



-- VIEW


view : Model -> Html Msg
view _ =
    div [] []
