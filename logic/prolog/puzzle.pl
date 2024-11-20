% Display the introductory statement
display_statement :-
    write('You encounter two natives, A and B. A says: "Either I am a knave or B is a Knight."'), nl,
    write('I will solve this puzzle...'), nl.

% Define the possible roles
knight.
knave.

% A's statement: Either A is a knave or B is a knight
a_statement(a, b) :- (a = knave ; b = knight).

% Determine the roles of A and B based on A's statement
determine_roles(A, B) :-
    display_statement,
    (   A = knight, \+ a_statement(A, B)  % If A is a knight, their statement must be true
    ->  write('A is a knight and B is a knight.')
    ;   A = knave, a_statement(A, B)     % If A is a knave, their statement must be false
    ->  write('A is a knave and B is a knave.'),
    !.
    ).