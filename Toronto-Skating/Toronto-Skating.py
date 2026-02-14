# Toronto Skating List #

# First Draft #

def arena_list(day, start_time, skate_type):
    program_construction = ("\nSorry, the program is still under construction.\n" +
    "Please try again later.\n")
    if day == "m":
        if start_time == "8":
            if skate_type == "a":
                mon_8am_leisure = ("\nSorry, there are no available sessions.\n")
                return mon_8am_leisure
            else:
                return program_construction
        else:
            return program_construction
    else:
        return program_construction    


def main(): 
    # Console prompts
    skateday = str(input("\nWhat day would you like to go skating?\nType one of the following: " +
                         "\n(m) - Monday\n(t) - Tuesday\n(w) - Wednesday \n(th) - Thursday " +
                           "\n(f) - Friday \n(sa) - Saturday \n(su) - Sunday \nYour selection: "))
    skatetime = str(input("\nWhat time would you like to start skating? \nType one of the following: " +
                         "\n(8) - 8:00am       (15) - 3:00pm     " +
                         "\n(9) - 9:00am       (16) - 4:00pm     " +
                         "\n(10) - 10:00am     (17) - 5:00pm     " +
                         "\n(11) - 11:00am     (18) - 6:00pm     " +
                         "\n(12) - 12:00pm     (19) - 7:00pm     " +
                         "\n(13) - 1:00pm      (20) - 8:00pm     " +
                         "\n(14) - 2:00pm         " +
                         "\nYour selection: "))

    skatetype = str(input("\nWhat type of skate session are you looking for?\nSelect one of the " +
                          "following:\n(a) - Leisure Skate\n(b) - Shinny\n(c) - Speed Skating " +
                           "\n(d) - Figure Skating \nYour selection: " ))
    
    selections = arena_list(skateday, skatetime, skatetype)
    print(selections) 
    
main()
