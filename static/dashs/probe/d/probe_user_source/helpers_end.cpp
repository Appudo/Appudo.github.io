#include "helpers.h"

PROBE_ENTRY_ITEM userEntries __attribute__((section("__probe_entries"), internal_linkage, used)) = PROBE_ENTRY_ITEM(0, 0);
PROBE_ENTRY_ITEM userInits __attribute__((section("__probe_inits"), internal_linkage, used)) = PROBE_ENTRY_ITEM(0, 0);