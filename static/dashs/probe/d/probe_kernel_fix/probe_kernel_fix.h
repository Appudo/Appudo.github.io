#ifndef asm_volatile_goto
#define asm_volatile_goto(x...) do { asm goto(x); asm (""); } while (0)
#endif
