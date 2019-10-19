#include "helpers.h"

char userEntries[0] __attribute__((section("__probe_entries"), used));
char userInits[0] __attribute__((section("__probe_inits"), used));