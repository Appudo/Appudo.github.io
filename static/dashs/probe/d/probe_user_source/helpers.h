#ifndef __USER_HELPERS_H
#define __USER_HELPERS_H

#include <stdint.h>
#include <stdlib.h>

struct Ctx {
private:
    Ctx() {
    }
};

union EventData {
    int32_t  fd;
    void*    ptr;
    uint32_t u32;
    uint64_t u64;
};

enum class EventTypes : uint32_t
{
    PERF,
};

struct Event
{
    EventTypes type;
    uint32_t   info;
    EventData  data;
};

extern bool SendStringFrame(Ctx& ctx, const void* data, size_t dataSize);
extern bool SendByteFrame(Ctx& ctx, const void* data, size_t dataSize);
extern bool SendPerfFrames(Ctx& ctx, void* perf);
extern bool AddUserData(Ctx& ctx, int32_t idx, void* data);

typedef void (*entry_func) (Ctx&, Event);

struct PROBE_ENTRY_ITEM {
    PROBE_ENTRY_ITEM(entry_func ptr, long id = _PNO)
        : id(id)
        , ptr(ptr)
    {
    }
    
    long       id;
    entry_func ptr;
};

#define PROBE_ENTRY static struct PROBE_ENTRY_ITEM __userEntry __attribute__((section("__probe_entries"), internal_linkage, used))
#define PROBE_INIT static struct PROBE_ENTRY_ITEM __userEntry __attribute__((section("__probe_inits"), internal_linkage, used))

#endif
