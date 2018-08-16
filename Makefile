#
#       Super Star Trek Classic
#

CC     = gcc
SRC    = startrek.c
EXE    = startrek
CFLAGS = -o3
LIBS   = -lm


all :: build

build ::
	$(CC) $(SRC) $(CFLAGS) -o $(EXE) $(LIBS)

clean ::
	rm -f $(EXE)
