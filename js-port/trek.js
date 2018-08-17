/*
 * superstartrek.js
 *
 * Javascript Super Star Trek v0.x
 *
 * Port of classic 1970s BASIC computer game.
 * Javascript port Copyright (C) 2009 Roberto Nerici
 * based on C port Copyright (C) 1996 Chris Nystrom
 * 
 * This program is free software; you can redistribute it and/or modify
 * in any way that you wish. _Star Trek_ is a trademark of Paramount
 * I think.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * This is a Javascript port of a v1.1 of a C program by Chris Nystrom.
 * That program was a port of an old BASIC program: the classic Super Star Trek
 * game. It comes from the book _BASIC Computer Games_ edited by David Ahl
 * of Creative Computing fame. It was published in 1978 by Workman Publishing,
 * 1 West 39 Street, New York, New York, and the ISBN is: 0-89489-052-3.
 *
 * The home page of this port is at http:www.bloggo.org/p/superstarstrek.html
 * More information about the original game, other ports and whole load of
 * games can be found on various sites on the web. Particularly good ones are:
 *  - http://www.dunnington.u-net.com/public/startrek/ and
 *  - http://www3.sympatico.ca/maury/games/space/star_trek.html
 *
 * Contact details for the author of this port:
 * Roberto Nerici
 *  w: http://roberto.nerici.org
 *  e: rnerici [at] gmail [dot] com
 *
 * Changes made for C -> Javascript conversion:
 *  - todo!
 *
 * Here is the original BASIC header:
 *
 * SUPER STARTREK - MAY 16, 1978 - REQUIRES 24K MEMORY
 *
 ***        **** STAR TREK ****        ****
 *** SIMULATION OF A MISSION OF THE STARSHIP ENTERPRISE,
 *** AS SEEN ON THE STAR TREK TV SHOW.
 *** ORIGINAL PROGRAM BY MIKE MAYFIELD, MODIFIED VERSION
 *** PUBLISHED IN DEC'S "101 BASIC GAMES", BY DAVE AHL.
 *** MODIFICATIONS TO THE LATTER (PLUS DEBUGGING) BY BOB
 *** LEEDOM - APRIL & DECEMBER 1974,
 *** WITH A LITTLE HELP FROM HIS FRIENDS . . .
 *** COMMENTS, EPITHETS, AND SUGGESTIONS SOLICITED --
 *** SEND TO:  R. C. LEEDOM
 ***           WESTINGHOUSE DEFENSE & ELECTRONICS SYSTEMS CNTR.
 ***           BOX 746, M.S. 338
 ***           BALTIMORE, MD  21203
 ***
 *** CONVERTED TO MICROSOFT 8 K BASIC 3/16/78 BY JOHN BORDERS
 *** LINE NUMBERS FROM VERSION STREK7 OF 1/12/75 PRESERVED AS
 *** MUCH AS POSSIBLE WHILE USING MULTIPLE STATMENTS PER LINE
 *
 */
 
 /* Global variables from C version */
var t;                              // Current Stardate (used as real)
var t0;                             // Start stardate (used as int)
var t9;                             // Allowed time for mission
var d0 = 0;                         // Docked flag (0 = not docked)
var d1 = 0;                         // Damage repair flag
var e = 0;                          // Current Energy (used as int)
var e0 = 3000;                      // Starting Energy
var p = 0;                          // Photon Torpedoes left
var p0 = 10;                        // Photon Torpedo capacity
var s = 0;                          // Current shield value
var d = dim_array(9, 0);            // Damage Array (used as array of reals)
var q1, q2;                         // Quadrant Position of Enterprise
var r1, r2;                         // Temporary variables (esp Location Corrdinates)
var z1, z2;                         // Temporary Sector Coordinates
var k3 = 0;                         // Klingons in Quadrant
var k7 = 0;                         // Klingons at start
var k9 = 0;                         // Total Klingons left
var k = dim_matrix(4, 4, 0);        // Klingon Data (for the current quadrant)
var g = dim_matrix(9, 9, 0);        // Galaxy
var z = dim_matrix(9, 9, 0);        // Cumulative Record of Galaxy
var z4;                             // Temporary quadrant coordinate (x?)
var z5;                             // Temporary quadrant coordinate (y?)
var b3 = 0;                         // Starbases in Quadrant
var b9 = 0;                         // Total Starbases
var s1, s2;                         // Current Sector Position of Enterprise (used as reals)
var sQ = dim_array(194, " ");       // Visual Display of Quadrant (array, but used as string)
var g5;                             // Quadrant name flag (used as int)
var x, y, x1, x2;                   // Navigational coordinates (used as reals)
var c1;                             // ?
var n;                              // Number of secors to travel
var sG2;                            // Temporary string
var a, c1;                          // Used by Library Computer


/* @@@ int c[2][10] = */  /* Used for location and movement */         
var c = dim_matrix(3, 10, 0);       /* modified to match MS BASIC array indicies */
c[1] = [0, 0, -1, -1, -1,  0,  1, 1, 1, 0];
c[2] = [1, 1,  1,  0, -1, -1, -1, 0, 1, 1];


/* New global variables */
var debug_on = 1;                   // enabled extra output
var easy_game = 0;                  // reduces damage
var small_game = 0;                 // game with less klingons
var usercommandhandler;             // function to continue with after receiving user input
var any_key_is_input = false;
var output = "";
var commandstring = "";
var prompt_string = "Command:";


/************************************************************************
** Main
************************************************************************/

function main()
{
    intro();
    new_game();
}


/************************************************************************
** Major functions (the bulk of the game in other words)
************************************************************************/

/*
Display intro/instructions, let user choose options, set stardate.
C->JS: added options.
*/
function intro()
{
  printf ("\n");
  printf (" *************************************\n");
  printf (" *                                   *\n");
  printf (" *                                   *\n");
  printf (" *      * * Super Star Trek * *      *\n");
  printf (" *                                   *\n");
  printf (" *                                   *\n");
  printf (" *************************************\n\n");

  printf("If you need instructions <a href='superstartrek.txt'>click here</a>.");

/*
//  printf("\nEasy game (y/n): ");
  userreply = prompt("Easy game (y/n):");
  if (userreply === 'y' || userreply === 'Y') {
    easy_mode = 1;
  }
*/

/*    
  printf("\nShort game (y/n): ");
  gets(sTemp);
  if (sTemp[0] == 'y' || sTemp[0] == 'Y')
    small = 1;
*/
  easy_game = 1;
  small_game = 1;

  printf ("\n\n");
  printf("                         ------*------\n");
  printf("         -------------   `---  ------'\n");
  printf("         `-------- --'      / /\n");
  printf("                  \\\\-------  --\n");
  printf("                  '-----------'\n");
  printf("\n       The USS Enterprise --- NCC - 1701\n\n\n");

  // randomize();               // C->JS: don't think this is needed now
}

function new_game()
{
  var sTemp;

  initialize();
  
  any_key_is_input = true;
  set_commandhandler(new_game2, " ");
  printf("Hit any key to accept command. ");
}

function new_game2()
{
  any_key_is_input = false;
  reset_commandhandler();
  clear_output();
  new_quadrant();
  short_range_scan();
  
//  while(1)
    //TODO!: this should be done after every command
    {
      if (s + e <= 10 && (e < 10 || d[7] < 0))
        {
          printf("\n** Fatal Error **   ");
          printf("You've just stranded your ship in space.\n\n");
          printf("You have insufficient maneuvering energy,");
          printf(" and Shield Control is presently\n");
          printf("incapable of cross circuiting to engine room!!\n\n");
          end_of_time();
        }
    }
}

function handle_command(command)
{
      printf("\n");
      switch (command) {
        case "NAV": {
            course_control();
            break;
        }
        case "SRS": {
            printf("Peforming short range scan sir.\n");
            short_range_scan();
            break;
        }
        case "LRS": {
            long_range_scan();
            break;
        }
        case "PHA": {
            phaser_control();
            break;
        }
        case "TOR": {
            photon_torpedoes();
            break;
        }
        case "SHE": {
            sheild_control();
            break;
        }
        case "DAM": {
            damage_control();
            break;
        }
        case "COM": {
            library_computer();
            break;
        }
        case "XXX": {
            resign_commision();
            break;
        }
        default: {
            printf("Enter one of the following:\n\n");
            printf("  NAV - To Set Course\n");
            printf("  SRS - Short Range Sensors\n");
            printf("  LRS - Long Range Sensors\n");
            printf("  PHA - Phasers\n");
            printf("  TOR - Photon Torpedoes\n");
            printf("  SHE - Sheild Control\n");
            printf("  DAM - Damage Control\n");
            printf("  COM - Library Computer\n");
            printf("  XXX - Resign Command\n");
            printf("\n");
        }
      }
      
      display();

/*
      else if (! strncmp(sTemp, "tor", 3))
        photon_torpedoes();
*/
}

function initialize()
{
  /* InItialize time */
  /* @@@ t0 = t; */
  t = (get_rand(20) + 20) * 100;    // set current stardate (C->JS, was in intro())
  t0 = t;                           // set starting stardate
  t9 = 25 + get_rand(10);           // set allowed time for mission

  /* Initialize Enterprise */
  d0 = 0;                           // clear docked flag
  e = e0;                           // set current energy to starting value
  p = p0;                           // set current photorp count to max
  s = 0;                            // set current shield value

  q1 = function_r();                // set position of the Enterprise
  q2 = function_r();
  s1 = function_r();
  s2 = function_r();

  for (i = 1; i <= 8; i++)          // clear the damage array
    d[i] = 0.0;

  /* Setup What Exists in Galaxy */
  k9 = 0;                           // clear number of klingons
  b9 = 0;                           // clear number of starbases
  
  for (i = 1; i <= 8; i++)
    for (j = 1; j <= 8; j++)
      {
        k3 = 0;
        z[i][j] = 0;
        r1 = get_rand(100);
        
        if (small_game) {
            if (r1 > 98)
              k3 = 3;
            else if (r1 > 96)
              k3 = 2;
            else if (r1 > 85)
              k3 = 1;
        }
        else {
            if (r1 > 98)
              k3 = 3;
            else if (r1 > 95)
              k3 = 2;
            else if (r1 > 80)
              k3 = 1;
        }

        k9 = k9 + k3;
        b3 = 0;

        if (get_rand(100) > 96)
          b3 = 1;

        b9 = b9 + b3;

        g[i][j] = k3 * 100 + b3 * 10 + function_r();
      }

  if (k9 > t9)
    t9 = k9 + 1;

  if (b9 == 0)
    {
      if (g[q1][q2] < 200)
        {
          g[q1][q2] = g[q1][q2] + 100;
          k9++;
        }

      g[q1][q2] = g[q1][q2] + 10;
      b9++;

      q1 = function_r();
      q2 = function_r();
    }

  k7 = k9;

  printf("Your orders are as follows:\n\n");
  printf("   Destroy the " + k9 + " Klingon warships which have invaded\n");
  printf("   the galaxy before they can attack Federation Headquarters\n");
  printf("   on stardate " + (t0 + t9) + ". This gives you " + t9 + " days.\n");
  if (b9 == 1) {
      printf("   There is 1 starbase in the galaxy for resupplying your ship.\n\n");
  }
  else if (b9 > 1) {
      printf("   There are " + b9 + " starbases in the galaxy for resupplying your ship.\n\n");
  }
}

function new_quadrant()
{
  z4 = q1;                          // Temporary quadrant coordinates
  z5 = q2;
  k3 = 0;                           // assume no klingons in quadrant for now
  b3 = 0;                           // assume no starbases in quadrant for now
  s3 = 0;                           // assume no stars in quadrant for now
  g5 = 0;                           // clear quadrant name flag 
  d4 = get_rand(100) / 100 / 50;    // set damage repair time (odd!)
  z[q1][q2] = g[q1][q2];            // update logged galaxy, we know this quadrant

  if (q1 >= 1 && q1 <= 8 && q2 >= 1 && q2 <= 8)
    {
      var sG2 = quadrant_name();    // C->JS: was done with global variable

      if (t0 != t) {
        printf("Now entering " + sG2 + " quadrant...\n\n");
      }
      else 
        {
          printf("\nYour mission begins with your starship located\n");
          printf("in the galactic quadrant " + sG2 + ".\n\n");
        }
    }

  /* @@@ k3 = g[q1][q2] * .01; */
  k3 = cint(g[q1][q2] * .01);           // how many klingons in this quadrant?
  /* @@@ b3 = g[q1][q2] * .1 - 10 * k3; */
  b3 = cint(g[q1][q2] * .1 - 10 * k3);  // how many starbases in this quadrant?
  s3 = g[q1][q2] - 100 * k3 - 10 * b3; // how many stars in this quadrant

/*  
  debug(k3);
  debug(b3);
  debug(s3);
*/

  if (k3 > 0)
    {
      printf("Combat Area  Condition Red\n");

      if (s < 200)
        printf("Shields Dangerously Low\n");
    }

  for (i = 1; i <= 3; i++)
    {
      k[i][1] = 0;
      k[i][2] = 0;
      k[i][3] = 0;
    }
    
  for (i = 0; i <= 192; i++) {
    sQ[i] = ' ';
  }
  sQ[193] = 0;

  /* Position Enterprise, then Klingons, Starbases, and stars */
  z1 = s1;
  z2 = s2;
//  debug("placing Enterprise");
  insert_in_quadrant("<*>");
  
  // Place klingons into empty parts of the quadrant
//  debug("placing Klingons");
  if (k3 > 0)
    {
      for (i = 1; i <= k3; i++)
        {
          find_empty_place();

          z1 = r1;
          z2 = r2;
          insert_in_quadrant("+K+");

          k[i][1] = r1;
          k[i][2] = r2;
          k[i][3] = 100 + get_rand(200);
        }
    }

  // Place starbase into empty part of the quadrant
//  debug("placing starbases");
  if (b3 > 0)
    {
      find_empty_place();

      z1 = r1;
      z2 = r2;
      insert_in_quadrant(">!<");

      b4 = r1;
      b5 = r2;
    }

  // Place stars into empty parts of the quadrant
//  debug("placing stars");
  for (i = 1; i <= s3; i++)
    {
      find_empty_place();

      z1 = r1;
      z2 = r2;
      insert_in_quadrant(" * ");
    }
    
//  debug_sQ();
}

function course_control()
{
//  register i;
  /* @@@ int c2, c3, q4, q5; */
//  int q4, q5;
//  string sTemp;
//  double c1;

//  printf("Course (0-9): ");
  set_commandhandler(course_control2, "Course (0-9):");
}

function course_control2(sTemp)
{
  var sX = "8";
  reset_commandhandler();

  printf("\n");

  c1 = parseFloat(sTemp);
 
  if (c1 === 9.0)
    c1 = 1.0;

  if (c1 < 0 || c1 > 9.0)
    {
      printf("Lt. Sulu roports:\n");
      printf("  Incorrect course data, sir!\n\n");
      return;
    }

  if (d[1] < 0.0)
    sX = "0.2";

//  printf("Warp Factor (0-" + sX + "): ");
  set_commandhandler(course_control3, "Warp Factor (0-" + sX + "): ");
}

function course_control3(sTemp)
{
  reset_commandhandler();
  var q4, q5;

  printf("\n\n");

  w1 = parseFloat(sTemp);

  if (d[1] < 0.0 && w1 > 0.21)
    {
      printf("Warp Engines are damaged. ");
      printf("Maximum speed = Warp 0.2.\n\n");
      return;
    }

  if (w1 <= 0.0)
    return;

  if (w1 > 8.1)
    {
      printf("Chief Engineer Scott reports:\n");
      printf("  The engines won't take warp " + w1 + "!\n\n");
      return;
    }

  n = cint(w1 * 8.0); /* @@@ note: this is a real round in the original basic */
  
  if (e - n < 0)
    {
      printf("Engineering reports:\n");
      printf("  Insufficient energy available for maneuvering");
      printf("  at warp " + w1 + "!\n\n");

      if (s >= n && d[7] >= 0.0)
        {
          printf("Deflector Control Room acknowledges:\n");
          printf("  " + s + " units of energy presently deployed to shields.\n");
        }

      return;
    }

  klingons_move();

  repair_damage();

  /* @@@ z1 = cint(s1); */
  z1 = cint(s1);
  /* @@@ z2 = cint(s2); */
  z2 = cint(s2);
  insert_in_quadrant("   ");

  /* @@@ c2 = cint(c1); */
  /* @@@ c3 = c2 + 1; */

  /* @@@ x1 = c[0][c2] + (c[0][c3] - c[0][c2]) * (c1 - c2); */
  /* @@@ x2 = c[1][c2] + (c[1][c3] - c[1][c2]) * (c1 - c2); */

  x1 = c[1][cint(c1)] + (c[1][cint(c1) + 1] - c[1][cint(c1)]) * (c1 - cint(c1));
  x2 = c[2][cint(c1)] + (c[2][cint(c1) + 1] - c[2][cint(c1)]) * (c1 - cint(c1));

  x = s1;
  y = s2;
  q4 = q1;
  q5 = q2;

  for (i = 1; i <= n; i++)
    {
      s1 = s1 + x1;
      s2 = s2 + x2;

      /* @@@ z1 = cint(s1); */
      z1 = cint(s1);
      /* @@@ z2 = cint(s2); */
      z2 = cint(s2);

      if (z1 < 1 || z1 >= 9 || z2 < 1 || z2 >= 9)
        {
          exceed_quadrant_limits();
          complete_maneuver();
          return;
        }

      if (string_compare("   ") != 1) /* Sector not empty */
        {
          s1 = s1 - x1;
          s2 = s2 - x2;
          printf("Warp Engines shut down at sector ");
          printf(z1 + ", " + z2 + " due to bad navigation.\n\n");
          i = n + 1;
        }
    }

  complete_maneuver();
}

function complete_maneuver()
{
  var t8;           // used as real

  /* @@@ z1 = cint(s1); */
  z1 = cint(s1);
  /* @@@ z2 = cint(s2); */
  z2 = cint(s2);
  insert_in_quadrant("<*>");

  maneuver_energy();

  t8 = 1.0;

  if (w1 < 1.0)
    t8 = w1;

  t = t + t8;

  if (t > t0 + t9)
    end_of_time();

  short_range_scan();
}


function exceed_quadrant_limits()
{
  var x5 = 0;   /* Outside galaxy flag */

  /* @@@ x = (8 * (q1 - 1)) + x + (n * x1); */
  x = (8 * q1) + x + (n * x1);
  /* @@@ y = (8 * (q2 - 1)) + y + (n * x2); */
  y = (8 * q2) + y + (n * x2);

  /* @@@ q1 = cint(x / 8.0); */
  q1 = Math.floor(x / 8.0);
  /* @@@ q2 = cint(y / 8.0); */
  q2 = Math.floor(y / 8.0);
  
  /* @@@ s1 = x - ((q1 - 1) * 8); */
  s1 = x - (q1 * 8);
  /* @@@ s2 = y - ((q2 - 1) * 8); */
  s2 = y - (q2 * 8);

  /* @@@ if (cint(s1) == 0) */
  if (Math.floor(s1) == 0)
    {
      q1 = q1 - 1;
      s1 = s1 + 8.0;
    }

  /* @@@ if (cint(s2) == 0) */
  if (Math.floor(s2) == 0)
    {
      q2 = q2 - 1;
      s2 = s2 + 8.0;
    }

  /* check if outside galaxy */

  if (q1 < 1)
    {
      x5 = 1;
      q1 = 1;
      s1 = 1.0;
    }

  if (q1 > 8)
    {
      x5 = 1;
      q1 = 8;
      s1 = 8.0;
    }

  if (q2 < 1)
    {
      x5 = 1;
      q2 = 1;
      s2 = 1.0;
    }

  if (q2 > 8)
    {
      x5 = 1;
      q2 = 8;
      s2 = 8.0;
    }

  if (x5 == 1)
    {
      printf("LT. Uhura reports:\n");
      printf("  Message from Starfleet Command:\n\n");
      printf("  Permission to attempt crossing of galactic perimeter\n");
      printf("  is hereby *denied*. Shut down your engines.\n\n");
      printf("Chief Engineer Scott reports:\n");
      /* @@@ printf("  Warp Engines shut down at sector %d, ", cint(s1)); */
      printf("  Warp Engines shut down at sector ", cint(s1) + ", ");
      /* @@@ printf("%d of quadrant %d, %d.\n\n", cint(s2), q1, q2); */
      printf(cint(s2) + " of quadrant " + q1 + ", " + q2 + ".\n\n");
    }
  /* else 
     new_quadrant(); @@@ this causes bugs when bouncing off galaxy walls.
                         basically, if you bounce very far, your quadrant contents
                         won't match your LRS.  Cool huh? */

  maneuver_energy();

  if (t > t0 + t9)
    end_of_time();

  /* @@@ what does this do?? It's in the original.
  if (8 * q1 + q2 = 8 * q4 + q5) 
    { 
      complete_maneuver();
    }
  */

  t = t + 1;

  new_quadrant();
}

function maneuver_energy()
{
  e = e - n - 10;

  if (e >= 0)
    return;

  printf("Shield Control supplies energy to complete maneuver.\n\n");

  s = s + e;
  e = 0;

  if (s <= 0)
    s = 0;
}

function short_range_scan()
{
  var sC = "GREEN";

  if (e < e0 * .1)
    sC = "YELLOW";

  if (k3 > 0)
    sC = "*RED*";

  // Determine if we're docked
  /* @@@ need to clear the docked flag here */
  d0 = 0;

  /* @@@ for (i = s1 - 1; i <= s1 + 1; i++) */
  for (i = Math.floor(s1 - 1); i <= Math.floor(s1 + 1); i++)
    /* @@@ for (j = s2 - 1; j <= s2 + 1; j++) */
    for (j = Math.floor(s2 - 1); j <= Math.floor(s2 + 1); j++)
      if (i >= 1 && i <= 8 && j >= 1 && j <= 8)
        {
          z1 = i;
          z2 = j;
          if (string_compare(">!<") == 1)
            {
              d0 = 1;
              sC = "DOCKED";
              e = e0;
              p = p0;
              printf("Shields dropped for docking purposes.\n");
              s = 0;
            }
        }
          
  if (d[2] < 0.0)
    {
      printf("\n*** Short Range Sensors are out ***\n");
      return;
    }

  printf("------------------------\n");
  for (i = 0; i < 8; i++)
  {
    for (j = 0; j < 24; j++) {
      putchar(sQ[i * 24 + j]); 
    }

    if (i == 0)
      printf("    Stardate            " + t + "\n");
    if (i == 1)
      printf("    Condition           " + sC + "\n");
    if (i == 2)
      printf("    Quadrant            " + q1 + "," + q2 + "\n");
    if (i == 3)
      printf("    Sector              " + s1 + "," + s2 + "\n");
    if (i == 4)
      printf("    Photon Torpedoes    " + p + "\n");
    if (i == 5)
      printf("    Total Energy        " + (e + s) + "\n");
    if (i == 6)
      printf("    Shields             " + s + "\n");
    if (i == 7)
      printf("    Klingons Remaining  " + k9 + "\n");
  }
  printf("------------------------\n\n");

  return;
}

function long_range_scan()
{
  printf("\n");
  if (d[3] < 0.0)
    {
      printf("Long Range Sensors are inoperable.\n");
      return;
    }

  printf("Long Range Scan for Quadrant " + q1 + ", " + q2 + "\n\n");

  for (i = q1 - 1; i <= q1 + 1; i++)
    {
      printf("--------------------\n:");
      for (j = q2 - 1; j <= q2 + 1; j++)
        if (i > 0 && i <= 8 && j > 0 && j <= 8)
          {
            z[i][j] = g[i][j];
            printf(" " + pad_zero(z[i][j], 3) + " :");
//            printf(" " + "000" + " :");
          }
        else
          printf(" *** :");
      printf("\n");
    }

    printf("--------------------\n\n");
}

function phaser_control()
{
  if (d[4] < 0.0)
    {
      printf("Phasers Inoperative\n\n");
      return;
    }

  if (k3 <= 0)
    {
      printf("Science Officer Spock reports:\n");
      printf("  'Sensors show no enemy ships in this quadrant'\n\n");
      return;
    }

  if (d[8] < 0.0)
    /* @@@ printf("Computer failure happers accuracy.\n"); */
    printf("Computer failure hampers accuracy.\n");

  printf("Phasers locked on target;\n");
  printf("Energy available = " + e + " units\n\n");

  // Set state and wait for user input
  set_commandhandler(phaser_control2, "Number of units to fire:");
}

function phaser_control2(sTemp)
{
  var iEnergy, h1, h;
  reset_commandhandler();
  printf("\n");

  iEnergy = atoi(sTemp);

  if (iEnergy <= 0)
    return;

  if (e - iEnergy < 0)
    {
      printf("Not enough energy available.\n\n");
      return;
    }

  e = e - iEnergy;

  if (d[8] < 0.0)
    /* @@@ iEnergy = iEnergy * rnd(); */
    iEnergy = Math.floor(iEnergy * rnd());

  h1 = iEnergy / k3;

  for (i = 1; i <= 3; i++)
    {
      if (k[i][3] > 0)
        {
          /* @@@ h = (h1 / function_d(0) * (rnd() + 2)); */
          h = Math.floor(h1 / function_d(0) * (rnd() + 2));
          
          if (h <= .15 * k[i][3])
            {
              printf("Sensors show no damage to enemy at " + 
                    k[i][1] + ", " + k[i][2] + "\n\n");
            }
          else
            {
              k[i][3] = k[i][3] - h;
              printf(h + " unit hit on Klingon at sector " + 
                    k[i][1] + ", " + k[i][2] + "\n");
              if (k[i][3] <= 0)
                {
                  printf("*** Klingon Destroyed ***\n\n");
                  k3--;
                  k9--;
                  z1 = k[i][1];
                  z2 = k[i][2];
                  insert_in_quadrant("   ");
                  k[i][3] = 0;
                  g[q1][q2] = g[q1][q2] - 100;
                  z[q1][q2] = g[q1][q2];
                  if (k9 <= 0)
                    won_game();
                }
              else
                /* @@@ printf("\n"); */
                printf("   (Sensors show " + k[i][3] + " units remaining)\n\n");
            }
        }
    }

  klingons_shoot();
}

function photon_torpedoes()
{
  if (p <= 0)
    {
      printf("All photon torpedoes expended\n");
      return;
    }

  if (d[5] < 0.0)
    {
      printf("Photon Tubes not operational\n");
      return;
    }

//  printf("Course (0-9): ");
  set_commandhandler(photon_torpedoes2, "Course (0-9):");
}

function photon_torpedoes2(input)
{
  reset_commandhandler();
  printf("\n");

  c1 = parseFloat(input);

  if (c1 == 9.0)
    c1 = 1.0;

  /* @@@ if (c1 < 0 || c1 > 9.0) */
  if (c1 < 1.0 || c1 > 9.0)
    {
      printf("Ensign Chekov roports:\n");
      printf("  Incorrect course data, sir!\n\n");
      return;
    }

  e = e - 2;
  p--;

  /* @@@ c2 = cint(c1); */
  /* @@@ c3 = c2 + 1; */

  /* @@@ x1 = c[0][c2] + (c[0][c3] - c[0][c2]) * (c1 - c2); */
  /* @@@ x2 = c[1][c2] + (c[1][c3] - c[1][c2]) * (c1 - c2); */

  x1 = c[1][Math.floor(c1)] + (c[1][Math.floor(c1) + 1] - c[1][Math.floor(c1)]) * (c1 - Math.floor(c1));
  x2 = c[2][Math.floor(c1)] + (c[2][Math.floor(c1) + 1] - c[2][Math.floor(c1)]) * (c1 - Math.floor(c1));

  x = s1 + x1;
  y = s2 + x2;

  x3 = cint(x); /* @@@ note: this is a true integer round in the MS BASIC version */
  y3 = cint(y); /* @@@ note: this is a true integer round in the MS BASIC version */

  x5 = 0;

  printf("Torpedo Track:\n");

  while (x3 >= 1 && x3 <= 8 && y3 >= 1 && y3 <= 8)
    {
      printf("    " + x3 + ", " + y3 + "\n");

      z1 = x3;
      z2 = y3;

      if (string_compare("   ") == 0)
        {
        torpedo_hit();
          klingons_shoot();
          return;
        }

      x = x + x1;
      y = y + x2;

      x3 = cint(x); /* @@@ note: this is a true integer round in the MS BASIC version */
      y3 = cint(y); /* @@@ note: this is a true integer round in the MS BASIC version */
    }

  printf("Torpedo Missed\n\n");

  klingons_shoot();
}

function torpedo_hit()
{
  x3 = cint(x); /* @@@ note: this is a true integer round in the MS BASIC version */
  y3 = cint(y); /* @@@ note: this is a true integer round in the MS BASIC version */

  if (string_compare(" * ") == 1)
    {
      printf("Star at " + x3 + ", " + y3 + "absorbed torpedo energy.\n\n");
      return;
    }

  if (string_compare("+K+") == 1)
    {
      printf("*** Klingon Destroyed ***\n\n");
      k3--;
      k9--;

      if (k9 <= 0)
        won_game();

      for (i=0; i<=3; i++)
        if (x3 == k[i][1] && y3 == k[i][2])
          k[i][3] = 0;
    }

  if (string_compare(">!<") == 1)
    {
      printf("*** Starbase Destroyed ***\n");
      b3--;
      b9--;

      if (b9 <= 0 && k9 <= t - t0 - t9)
        {
          printf("That does it, Captain!!");
          printf("You are hereby relieved of command\n");
          printf("and sentanced to 99 stardates of hard");
          printf("labor on Cygnus 12!!\n");
          resign_commision();
        }

      printf("Starfleet Command reviewing your record to consider\n");
      printf("court martial!\n\n");

      d0 = 0;    /* Undock */
    }

  z1 = x3;
  z2 = y3;
  insert_in_quadrant("   ");

  g[q1][q2] = (k3 * 100) + (b3 * 10) + s3;
  z[q1][q2] = g[q1][q2];
}

function damage_control()
{ 
  var d3 = 0.0;

  if (d[6] < 0.0)
    {
      printf("Damage Control report not available.\n");

      if (d0 == 0)
        return;

      d3 = 0.0;
      for (i = 1; i <= 8; i++)
        if (d[i] < 0.0)
          d3 = d3 + .1;

      if (d3 == 0.0)
        return;

      d3 = d3 + d4;
      if (d3 >= 1.0)
        d3 = 0.9;

      printf("\nTechnicians standing by to effect repairs to your");
      /* @@@ printf("ship; Will you authorize the repair order (Y/N)? "); */
      printf("ship;\nEstimated time to repair: " + d3 + " stardates.\n");
      printf("Will you authorize the repair order (Y/N)? ");

      // TODO!
//      a1 = getchar();
      a1 = "N";

      if (a1 == 'Y' || a1 == 'y')
        {
          for (i = 1; i <= 8; i++)
            if (d[i] < 0.0)
              d[i] = 0.0;

          t = t + d3 + 0.1;
        }
    }

  printf("Device            State of Repair\n");

  for (r1 = 1; r1 <= 8; r1++)
    {
      var sG2 = get_device_name(r1);
      printf(sG2);
      /* @@@ for (i = 1; i < 25 - strlen(sG2); i++) */
      for (i = 1; i < 25 - parseInt(sG2.length); i++)
      printf(" ");
      /* @@@ printf("%4.1f\n", d[r1]); */
//      printf("%4.2f\n", d[r1]);
      printf(d[r1] + "\n");
    }

  printf("\n");
} 

function sheild_control()
{
  if (d[7] < 0.0)
    {
      printf("Sheild Control inoperable\n");
      return;
    }

  printf("Energy available = " + (e + s) + "\n\n");

//  printf("Input number of units to shields: ");
  
  // Set state and wait for user input
  set_commandhandler(sheild_control2, "Input number of units to shields:");
  }

function sheild_control2(input)
{
  reset_commandhandler();

  printf("\n");

  var i = parseInt(input);

  if (i < 0 || s == i)
    {
      printf("<Sheilds Unchanged>\n\n");
      return;
    }

  if (i >= e + s)
    {
      printf("Sheild Control Reports:\n");
      printf("  'This is not the Federation Treasury.'\n");
      printf("<Sheilds Unchanged>\n\n");
      return;
    }

  e = e + s - i;
  s = i;

  printf("Deflector Control Room report:\n");
  printf("  'Shields now at " + s + " units per your command.'\n\n");
}

function library_computer()
{
  if (d[8] < 0.0)
    {
      printf("Library Computer inoperable\n");
      return;
    }

//  printf("Computer active and awating command: ");
  
  // Set state and return, waiting for more input
  set_commandhandler(library_computer2, "Computer active and awating command (0-5): ");
}

function library_computer2(sTemp)
{
  // Clear state as if the input is invalid we abort this command anyway
  reset_commandhandler();
  printf("\n");

  if (sTemp === "0")
    galactic_record();
  else if (sTemp === "1")
    status_report();
  else if (sTemp === "2")
    torpedo_data();
  else if (sTemp === "3")
    nav_data();
  else if (sTemp === "4")
    dirdist_calc();
  else if (sTemp === "5")
    galaxy_map();
  else
    {
      printf("Functions available from Library-Computer:\n\n");
      printf("   0 = Cumulative Galactic Record\n");
      printf("   1 = Status Report\n");
      printf("   2 = Photon Torpedo Data\n");
      printf("   3 = Starbase Nav Data\n");
      printf("   4 = Direction/Distance Calculator\n");
      printf("   5 = Galaxy 'Region Name' Map\n\n");
    }
}

function galactic_record()
{
//  printf("\n     Computer Record of Galaxy for Quadrant %d,%d\n\n", q1, q2);
  printf("\n     Computer Record of Galaxy for Quadrant " + q1 + "," + q2 + "\n\n");
  printf("     1     2     3     4     5     6     7     8\n");

  for (i = 1; i <= 8; i++)
  { 
    printf("   ----- ----- ----- ----- ----- ----- ----- -----\n");

    printf(i);

    for (j = 1; j <= 8; j++)
    {
      printf("   ");

      if (z[i][j] == 0)
        printf("***");
      else
//        printf("%3.3d", z[i][j]);
        printf(pad_zero(z[i][j], 3));
    }

    printf("\n");
  }

  printf("   ----- ----- ----- ----- ----- ----- ----- -----\n\n");

}

function galaxy_map()
{
  g5 = 1;

  printf("\n                   The Galaxy\n\n");
  printf("    1     2     3     4     5     6     7     8\n");

  for (i = 1; i <= 8; i++)
  {
    printf("  ----- ----- ----- ----- ----- ----- ----- -----\n");

    printf(" " + i);

    z4 = i;
    z5 = 1;
    var sG2 = quadrant_name();      // C->JS: was done with global variable

    var j0 = 11 - (sG2.length / 2);

    for (j = 0; j < j0; j++)
      printf(" ");

    printf(sG2);

    for (j = 0; j < j0; j++)
      printf(" ");

    if (! (sG2.length % 2))
      printf(" ");

    z5 = 5;
    sG2 = quadrant_name();

    j0 = Math.round(12 - (sG2.length / 2));

    for (j = 0; j < j0; j++)
      printf(" ");

    printf(sG2); 
   
    printf("\n");
  }

  printf("  ----- ----- ----- ----- ----- ----- ----- -----\n\n");
}

function status_report()
{
  printf("\nStatus Report:\n");

  if (k9 > 1)
      printf("    Klingons Left: " + k9 + "\n", k9);

  /* @@@ .1 * cint((t0 + t9 - t) * 10)); */
  printf("    Mission must be completed in " + 
    0.1 * Math.floor(((t0 + t9 - t) * 10)) + 
    " stardates\n");

  if (b9 < 1)
  {
    printf("Your stupidity has left you on your own in the galaxy\n");
    printf(" -- you have no starbases left!\n");
  }
  else
  {  
    if (b9 == 1) {
        printf("    The Federation is maintaining 1 starbase in the galaxy\n");
        }
     else {
        printf("    The Federation is maintaining " + b9 + " starbases in the galaxy\n");
     }
  }

  printf("\n");
}

function torpedo_data()
{
  printf("\n");
  
  if (k3 <= 0)
  {
    printf("Science Officer Spock reports:\n");
    printf("  'Sensors show no enemy ships in this quadrant.'\n\n");
    return;
  }

  if (k3 > 1)
      printf("From Enterprise to Klingon battlecriusers:\n\n");
  else
      printf("From Enterprise to Klingon battlecriuser:\n\n");

  for (i = 1; i <= 3; i++)
  {
    if (k[i][3] > 0)
    {
      w1 = k[i][1];
      x  = k[i][2];
      c1 = s1;
      
      a  = s2;

      compute_vector();
    }
  }
}

function nav_data()
{
  printf("\n");
  
  if (b3 <= 0)
  {
    printf("Mr. Spock reports,\n");
    printf("  'Sensors show no starbases in this quadrant.'\n\n");
    return;
  }

  w1 = b4;
  x  = b5;
  c1 = s1;
  a  = s2;

  compute_vector();
}

function dirdist_calc()
{
  printf("\nDirection/Distance Calculator\n");
//  printf("You are at quadrant %d,%d sector %d,%d\n\n", q1, q2,
  printf("You are at quadrant " + q1 + "," + q2 + 
    " sector " + Math.floor(s1) + "," + Math.floor(s2) + "\n\n");
    
//  printf("Please enter initial X coordinate: \n");

  // Set state so that we can continue after user input
  set_commandhandler(dirdist_calc2, "Please enter initial X coordinate:");
}

function dirdist_calc2(input)
{
  c1 = parseInt(input);

//  printf("Please enter initial Y coordinate: \n");
  
  // Set state so that we can continue after user input
  printf("\n");
  set_commandhandler(dirdist_calc3, "Please enter initial Y coordinate:");
}

function dirdist_calc3(input)
{
  a = parseInt(input);

//  printf("Please enter final X coordinate: \n");

  // Set state so that we can continue after user input
  printf("\n");
  set_commandhandler(dirdist_calc4, "Please enter final X coordinate:");
}

function dirdist_calc4(input)
{
  w1 = parseInt(input);

//  printf("Please enter final Y coordinate: \n");

  // Set state so that we can continue after user input
  printf("\n");
  set_commandhandler(dirdist_calc5, "Please enter final Y coordinate:");
}

function dirdist_calc5(input)
{
  // Clear state as we've finished with this sequence now (phew!)
  reset_commandhandler();

  x = parseInt(input);
  printf("\n\n");
  compute_vector();
}

function compute_vector()
{
  x = x - a;
  a = c1 - w1;

  if (x <= 0.0)
  {
    if (a > 0.0)
    {    
      c1 = 3.0;
      sub2();
      return;
    }
    else
    {
      c1 = 5.0;
      sub1();
      return;
    }
  }
  else if (a < 0.0)
  {
    c1 = 7.0;
    sub2();
    return;
  }
  else
  {
    c1 = 1.0;
    sub1();
    return;
  }
}

/* Used as part of vector calculator (e.g. torpedo) functions. */
function sub1()
{
  x = Math.abs(x);
  a = Math.abs(a);
  
  if (a <= x)
//    printf("  DIRECTION = %4.2f\n", c1 + (a / x));
    printf("  DIRECTION = " + (c1 + (a / x)) + "\n");
  else
//    printf("  DIRECTION = %4.2f\n", c1 + (((a * 2) - x) / a));
    printf("  DIRECTION = " + (c1 + (((a * 2) - x) / a)) + "\n");

//  printf("  DISTANCE = %4.2f\n\n", (x > a) ? x : a);
  printf("  DISTANCE = " + ((x > a) ? x : a) + "\n\n");
}

/* Used as part of vector calculator (e.g. torpedo) functions. */
function sub2()
{
  x = Math.abs(x);
  a = Math.abs(a);

  if (a >= x)
    printf("  DIRECTION = " + (c1 + (x / a)) + "\n");
  else
    /* @@@ printf("  DIRECTION = %4.2f\n\n", c1 + (((x * 2) - a) / x)); */
    printf("  DIRECTION = " + (c1 + (((x * 2) - a) / x)) + "\n");

  /* @@@ printf("  DISTANCE = %4.2f\n", (x > a) ? x : a); */
  printf("  DISTANCE = " + ((x > a) ? x : a) + "\n\n");
}

function ship_destroyed()
{
  printf("The Enterprise has been destroyed. ");
  printf("The Federation will be conquered.\n\n");

  end_of_time();
}

function end_of_time()
{
  printf("It is stardate " + Math.floor(t) + ".\n");

  resign_commision();
}

function resign_commision()
{
  printf("\n");
  printf("There were " + k9 + " Klingon Battlecruisers left at the");
  printf(" end of your mission.\n\n");

  end_of_game();
}

function won_game()
{
  printf("Congratulations, Captain! The last Klingon Battle Cruiser\n");
  printf("menacing the Federation has been destoyed.\n\n");
 
  if (t - t0 > 0)
    printf("Your efficiency rating is " + (1000 * pow(k7 / (t - t0), 2)) + "\n");

  end_of_game();
}

function klingons_move()
{
  for (i = 1; i <= 3; i++)
    {
      if (k[i][3] > 0)
        {
          z1 = k[i][1];
          z2 = k[i][2];
          insert_in_quadrant("   ");

          find_empty_place();

          k[i][1] = z1;
          k[i][2] = z2;
          insert_in_quadrant("+K+");
        }
    }

  klingons_shoot();
}

function klingons_shoot()
{
  var h, i;

  if (k3 <= 0)
    return;

  if (d0 != 0)
    {
      printf("Starbase shields protect the Enterprise\n\n");
      return;
    }

  for (i = 1; i <= 3; i++)
    {
      if (k[i][3] > 0)
      {
          h = Math.floor((k[i][3] / function_d(i)) * (2 + rnd()));
          s = s - h;
          /* @@@ k[i][3] = k[i][3] / (3 + rnd()); */
          k[i][3] = Math.floor(k[i][3] / (3 + rnd()));

          printf(h + " unit hit on Enterprise from sector ");
          printf(k[i][1] +", " + k[i][2] + "\n");

          if (s <= 0)
          {
              printf("\n");
              ship_destroyed();
          }
          else {
              printf("    <Shields down to " + s + " units>\n\n");

              if (h >= 20)
              {
                  /* C->JS:
                  if easy mode is enabled, change the chance of being damaged.
                  original has two conditions, either of which is enough:
                  1. hit is more than 20% of shields
                  2. 60% random chance anyway
                  Easy mode changes the random one to 20% as original seems very high
                  */
                  var random_dam_chance = (easy_game) ? 0.2 : 0.6;
                  if (rnd() <= random_dam_chance || (h / s) > 0.2)
                  {
                      r1 = function_r();
                      d[r1] = d[r1] - (h / s) - (0.5 * rnd());

                      var sG2 = get_device_name(r1);

                      printf("Damage Control reports '" + sG2 + "' damaged by hit\n\n");
                  }
              }
          }
        }
    } 
}

function end_of_game()
{
  if (b9 > 0)
    {
      printf("The Federation is in need of a new starship commander");
      printf(" for a similar mission.\n");
      printf("If there is a volunteer, let him step forward and");
      printf(" enter 'aye':\n\n");

      // Set state and wait for user input
      set_commandhandler(end_of_game2);
    }

    // TODO! think if we should do something else here
//  exit(0);
}

function end_of_game2(input)
{
  printf("\n");

  if (input === "aye") {
      // They want to play again :-) Clear state and start a new game.
      reset_commandhandler();
      new_game();
  }
}


/************************************************************************
** Misc Functions and Subroutines (from original)
************************************************************************/

function repair_damage()
{
  var d6 = w1;

  if (w1 >= 1.0)
    d6 = w1 / 10;

  for (i = 1; i <= 8; i++)
    {
      if (d[i] < 0.0)
        {
          d[i] = d[i] + d6;
          if (d[i] > -0.1 && d[i] < 0)
            d[i] = -0.1;
          else if (d[i] >= 0.0)
            {
              if (d1 != 1)
                d1 = 1;

              printf("Damage Control report:\n");
              r1 = i;
              var sG2 = get_device_name(r1);
              printf("    " + sG2 + " repair completed\n\n");
            }
        }
    }

  if (rnd() <= 0.2)
    {
      r1 = function_r();

      // C->JS: if easy mode, removed random chance of things getting damaged
      if (rnd() < .6 && !easy_game)
        {
          d[r1] = d[r1] - (rnd() * 5.0 + 1.0);
          printf("Damage Control report:\n");
          printf("    " + get_device_name(r1) + " damaged\n\n");
        }
      else
        {
          d[r1] = d[r1] + (rnd() * 3.0 + 1.0);
          printf("Damage Control report:\n");
          printf("    " + get_device_name(r1) + " state of repair improved\n\n");
        }
    }
}

/* Randomly chooses an empty space in the current quadrant (sQ) */
function find_empty_place()
{
  /* @@@ while (z3 == 0) this is a nasty one.*/
  do
    {
      r1 = function_r();
      r2 = function_r();

      z1 = r1;
      z2 = r2;

      // check if three items in sQ starting at r1/r2 are blank
      // TODO! looks iffy
      z1 = Math.floor(z1 + 0.5);
      z2 = Math.floor(z2 + 0.5);
      s8 = ((z2 - 1) * 3) + ((z1 - 1) * 24) + 1;
      if (string_compare("   ") == 1) {
//      debug("empty place found at " + s8);
        z3 = 1;
      }

    } while (z3 == 0);

  z3 = 0;
}

/* Puts the enterprise shape in the correct part of sQ */
function insert_in_quadrant(sA)
{
//debug("inserting '" + sA + "'");
  /* @@@ s8 = ((z2 - 1) * 3) + ((z1 - 1) * 24) + 1; */
  s8 = (Math.floor(z2 - 0.5) * 3) + (Math.floor(z1 - 0.5) * 24) + 1;

  sQ[s8-1] = sA[0];
  sQ[s8] = sA[1];
  sQ[s8+1] = sA[2];
}

/* Returns the name of the Enterprise device for the supplied
device index.
C->JS: Both the parameter index and the return string were both globals.*/
function get_device_name(device_index)
{
  var device_name = [
    "", "Warp Engines","Short Range Sensors","Long Range Sensors",
    "Phaser Control","Photon Tubes","Damage Control","Sheild Control",
    "Library-Computer"];

  if (device_index < 0 || device_index >= device_name.length)
    device_index = 0;

  return device_name[device_index];
}

/* Checks if _display_string_ is in the quadrant display string _sQ_
at the location given by the global variables z1 and z2.
C->JS: C version had no parameter and was done with all global variables.
This one is a minor tweak to improve readability just a little.
*/
function string_compare(display_string)
{
  z1 = Math.floor(z1 + 0.5);
  z2 = Math.floor(z2 + 0.5);

  // TODO! well, not really
//  var s8 = ((z2 - 1) * 3) + ((z1 - 1) * 24) + 1;
  var s8 = ((z2 - 1) * 3) + ((z1 - 1) * 24);

//  debug("string compare debug: " + s8 + ": '" + sQ[s8] + sQ[s8+1] + sQ[s8+2] + "'\n");
  // mid_str(sB, sQ, s8, 3);
  if (sQ[s8] == display_string[0] &&
      sQ[s8 + 1] == display_string[1] &&
      sQ[s8 + 2] == display_string[2]) {
          return 1;     // return that we found it
  }
  else {
    return 0;     // return that we didn't find it
  }
}

function quadrant_name()
{
  var sG2 = "Mystery";          // the returned quadrant name
  
  var quad_name = ["","Antares","Rigel","Procyon","Vega",
    "Canopus","Altair","Sagittarius","Pollux","Sirius","Deneb","Capella",
    "Betelgeuse","Aldebaran","Regulus","Arcturus","Spica"];

  var sect_name = [""," I"," II"," III"," IV"];

  if (z4 < 1 || z4 > 8 || z5 < 1 || z5 > 8)
    sG2 = "Unknown";

  if (z5 <= 4)
    sG2 = quad_name[z4];
  else
    sG2 = quad_name[z4+8];

  if (g5 != 1)
    {
      if (z5 > 4)
          z5 = z5 - 4;
      sG2 += sect_name[z5];
    }

  return sG2;
}


/************************************************************************
** Minor functions from the original version
************************************************************************/

/* Returns an integer from 1 to iSpread */
function get_rand(iSpread)
{
  return(Math.floor(Math.random() * iSpread) + 1);
}


function rnd()
{
    return Math.random();
}

function function_d(i)
{
  /* @@@ j = sqrt(pow((k[i][1] - s1), 2) + pow((k[i][2] - s2), 2)); */
  j = Math.floor(sqrt(pow((k[i][1] - s1), 2) + pow((k[i][2] - s2), 2)));

  return j;
}

/* Returns an integer from 1 to 8 - used for coordinates */
function function_r()
{
  return(get_rand(8));
}


/************************************************************************
** Utility functions written for compatibility with C version.
************************************************************************/

/* Provide a 'printf' function */
function printf(outstring) {
    output += outstring;
//    document.getElementById('output_area').innerHTML = document.getElementById('output_area').innerHTML + outstring;
//    document.getElementById('output_area').innerHTML = output + "Command: " + commandstring;
    display();
}

/* Provide a 'putchar' function */
function putchar(outstring) {
//    document.write(outstring);
//    document.getElementById('output_area').innerHTML = document.getElementById('output_area').innerHTML + outstring;
    printf(outstring);
}

/* Wraps Math.round, just to keep source looking similar */
function cint(real_number)
{
    return Math.round(real_number);
}

/* Implements atoi. If input is invalid it will return zero. */
function atoi(string)
{
    parsedValue = parseInt(string);
    if (isNaN(parsedValue)) {
        parsedValue = 0;
    }

    return parsedValue;
}

/* Wraps Math.pow, just to keep source looking similar */
function pow(base, exponent)
{
    return Math.pow(base, exponent);
}

/* Wraps Math.sqrt, just to keep source looking similar */
function sqrt(value)
{
    return Math.sqrt(value);
}


/************************************************************************
** New functions.
************************************************************************/

/* Write debug output, if debug_on is true */
function debug(arg1)
{
    if (debug_on) {
        printf(arg1 + "\n");
    }
}

function dim_array(dimension, initial)
{
    var a = [], i;
    for (i = 0; i < dimension; i += 1) {
        a[i] = initial;
    }
    return a;
}

function dim_matrix(m, n, initial)
{
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
}

/* Pad a number with _n_ zeroes. To replace printf('%3.3d') functionality. */
var pad_zero = function(x, n) {
    var zeros = repeat_string("0", n);
    return String(zeros + x).slice(-1 * n)
}

/* Just return a string with _i_ copies of _str_ concatanated */
function repeat_string(str, i) {
   if (isNaN(i) || i <= 0) return "";
   return str + repeat_string(str, i-1);
}


/*
function pad(number, length)
{
   var str = "" + number;
   while(str.length < length) {
     str = â€˜0â€²+str;
   }
   return str;
}
*/

function debug_sQ()
{
    if (debug_on) {
        var index;
        printf("  -1--2--3--4--5--6--7--8-\n");
        for (y = 0; y < 8; y++) {
            printf(y + ":");
            for (x = 0; x < 8; x++) {
                index = y * 24 + x * 3;
                printf(sQ[index]);
                printf(sQ[index + 1]);
                printf(sQ[index + 2]);
            }
            printf(":" + index + "\n");
        }
    }
}

function clear_output()
{
    output = "";
    document.getElementById('output_area').innerHTML = "";
}

function set_commandhandler(command_function, new_prompt_string)
{
    if (typeof(command_function) === "function") {
        usercommandhandler = command_function;
        if (new_prompt_string) {
            prompt_string = new_prompt_string;
        }
    }
    else {
        printf("Scotty reports internal system malfunction!\n");
        reset_commandhandler();
    }
}

function reset_commandhandler()
{
    any_key_is_input = false;
    usercommandhandler = undefined;
    prompt_string = "Command:";         // TODO! comment this
}

function usercommand(input_id)
{
    // Get the user input and clear it from the UI
    if (document.getElementById(input_id)) {
        var input = document.getElementById(input_id).value;
        document.getElementById(input_id).value = "";
        printf("<span class='command_history'>" + prompt_string + " " + input + "</span>");
        commandstring = "";
    }

    if (typeof(usercommandhandler) === "function") {
        usercommandhandler(input);
        display();
    }
    else {
        handle_command(input);
        display();
    }
}

function usercommand2(input)
{
    printf("<span class='command_history'>" + prompt_string + " " + input + "</span>");
    commandstring = "";

    if (typeof(usercommandhandler) === "function") {
        usercommandhandler(input);
        display();
    }
    else {
        handle_command(input);
        display();
    }
}

//function userkeypress(input_id, event)
function userkeypress(event)
{
    if (any_key_is_input) {
        usercommand("");
        display();
    }
    else {
//        var input = document.getElementById(input_id).value;
        var keynum = event.which;
        
        // validate the key
        if ((keynum >= 48 && keynum <= 57) ||       // digits
            (keynum >= 65 && keynum <= 90)) {       // letters
            // is alphanumeric so it's fine
            var keychar = String.fromCharCode(keynum);
            commandstring += keychar;
        } else if (keynum === 190) {               // period
            commandstring += '.';
        } else if (keynum === 8) {
            // Backspace (delete)
            commandstring = commandstring.slice(0,-1);
        }
        else if (keynum === 13) {
            // Enter
            usercommand2(commandstring);
        }
        else if (keynum === 27) {
            // escape key so clear input
            commandstring = "";
        }
        display();
    }
}

function display()
{
    document.getElementById('output_area').innerHTML = 
        output +
        "<span class='command_echo'>" + prompt_string + " " + commandstring + "</span>" +
        "<span class='command_cursor'>_</span>";
//        document.body.clientHeight;
//    window.moveTo(0, document.body.clientHeight);
    window.scrollTo(0, document.body.clientHeight);
}

