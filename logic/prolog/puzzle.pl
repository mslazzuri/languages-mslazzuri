% Define the structure: each person has a Name, a Pet, and a House color.
solution(Solution) :-
    Solution = [
        person(_, _, _),
        person(_, _, _),
        person(_, _, _),
        person(_, _, _),
        person(_, _, _)
    ],

    % Ensure all names are different.
    member(person(alice, _, _), Solution),
    member(person(bob, _, _), Solution),
    member(person(carol, _, _), Solution),
    member(person(david, _, _), Solution),
    member(person(eve, _, _), Solution),

    % Ensure all pets are different.
    member(person(_, dog, _), Solution),
    member(person(_, cat, _), Solution),
    member(person(_, fish, _), Solution),
    member(person(_, bird, _), Solution),
    member(person(_, hamster, _), Solution),

    % Ensure all house colors are different.
    member(person(_, _, white), Solution),
    member(person(_, _, pink), Solution),
    member(person(_, _, red), Solution),
    member(person(_, _, yellow), Solution),
    member(person(_, _, blue), Solution),
    
    % Clues:

% Predicate to print the solution in formatted strings
print_solution([]).
print_solution([person(Name, Pet, HouseColor) | Rest]) :-
    format("~w owns the ~w and lives in the ~w house.~n", [Name, Pet, HouseColor]),
    print_solution(Rest).

% Main predicate to solve and print
solve :-
    solution(Solution),
    print_solution(Solution).
