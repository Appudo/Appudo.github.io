#ifndef __BPF_HELPERS_H
#define __BPF_HELPERS_H

#include <linux/version.h>

#define bpf_tail_call _bpf_tail_call
#define bpf_get_stackid _bpf_get_stackid

#include <linux/bpf.h>

#undef bpf_tail_call
#undef bpf_get_stackid

#ifndef KERNEL_VERSION
#define	KERNEL_VERSION(ver, rel, seq)	((ver << 16) | (rel << 8) | (seq))
#endif

#define SECTION(NAME) __attribute__((section(NAME), used))
#define LICENSE SECTION("license")  extern const char __license[] 

#define lambda(return_type, function_body) \
({ \
      return_type __fn__ function_body \
          __fn__; \
})

extern const  unsigned long __version SECTION("version") = LINUX_VERSION_CODE;

struct sk_buff;
unsigned long long load_byte(void *skb,
			     unsigned long long off) asm("llvm.bpf.load.byte");
unsigned long long load_half(void *skb,
			     unsigned long long off) asm("llvm.bpf.load.half");
unsigned long long load_word(void *skb,
			     unsigned long long off) asm("llvm.bpf.load.word");

struct bpf_map_def {
	unsigned int type;
	unsigned int key_size;
	unsigned int value_size;
	unsigned int max_entries;
	unsigned int map_flags;
	unsigned int inner_map_fd;
	unsigned int numa_node;
};

enum bpf_map_type_def {
	__BPF_MAP_TYPE_UNSPEC           = BPF_MAP_TYPE_UNSPEC,
	__BPF_MAP_TYPE_HASH             = BPF_MAP_TYPE_HASH,
	__BPF_MAP_TYPE_ARRAY            = BPF_MAP_TYPE_ARRAY,
	__BPF_MAP_TYPE_PROG_ARRAY       = BPF_MAP_TYPE_PROG_ARRAY,
	__BPF_MAP_TYPE_PERF_EVENT_ARRAY = BPF_MAP_TYPE_PERF_EVENT_ARRAY,
	__BPF_MAP_TYPE_PERCPU_HASH      = BPF_MAP_TYPE_PERCPU_HASH,
	__BPF_MAP_TYPE_PERCPU_ARRAY     = BPF_MAP_TYPE_PERCPU_ARRAY,
	__BPF_MAP_TYPE_STACK_TRACE      = BPF_MAP_TYPE_STACK_TRACE,
	/* */
	__BPF_MAP_CUSTOM_BASE           = 0x40000000,
	__BPF_PERF_OUT                  = __BPF_MAP_CUSTOM_BASE + 1,
	
};

#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,1,0))
#ifndef THE_BPF_CPU
#if LINUX_VERSION_CODE >= KERNEL_VERSION(4, 8, 0)
#define THE_BPF_CPU BPF_F_CURRENT_CPU
#else
#define THE_BPF_CPU bpf_get_smp_processor_id()
#endif
#endif
#endif

#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,4,0))
struct _perf_output_helper {
  int (*perf_submit) (void *, void *, u32);
  int (*perf_submit_skb) (void *, u32, void *, u32);
};
#define BPF_PERF_OUTPUT(_name) \
__attribute__((section("maps"))) \
struct bpf_map_def _name##_real = { .type = __BPF_PERF_OUT }; \
static int _name##_func1(void* ctx, void* data, u32 size) { bpf_perf_event_output(ctx, &_name##_real, THE_BPF_CPU, data, size); } \
static int _name##_func2(void* skb, u32 skb_len, void* meta, u32 meta_len) { bpf_perf_event_output(skb, &_name##_real, ((u64)skb_len << 32) | THE_BPF_CPU, meta, meta_len); } \
static struct _perf_output_helper _name = { .perf_submit = _name##_func1, \
                                     .perf_submit_skb = _name##_func2 }
#endif

#if (LINUX_VERSION_CODE >= KERNEL_VERSION(3,19,0))
static void *(*bpf_map_lookup_elem)(void *map, void *key) = (void *) BPF_FUNC_map_lookup_elem;
static int (*bpf_map_update_elem)(void *map, void *key, void *value,
				  unsigned long long flags) = (void *) BPF_FUNC_map_update_elem;
static int (*bpf_map_delete_elem)(void *map, void *key) = (void *) BPF_FUNC_map_delete_elem;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,1,0))
static int (*bpf_probe_read)(void *dst, int size, void *unsafe_ptr) = (void *) BPF_FUNC_probe_read;
static unsigned long long (*bpf_ktime_get_ns)(void) = (void *) BPF_FUNC_ktime_get_ns;
static int (*bpf_trace_printk)(const char *fmt, int fmt_size, ...) = (void *) BPF_FUNC_trace_printk;
static unsigned long long (*bpf_get_smp_processor_id)(void) = (void *) BPF_FUNC_get_smp_processor_id;
static unsigned long long (*bpf_get_prandom_u32)(void) = (void *) BPF_FUNC_get_prandom_u32;
static int (*bpf_skb_store_bytes)(void *ctx, int off, void *from, int len, int flags) = (void *) BPF_FUNC_skb_store_bytes;
static int (*bpf_l3_csum_replace)(void *ctx, int off, int from, int to, int flags) = (void *) BPF_FUNC_l3_csum_replace;
static int (*bpf_l4_csum_replace)(void *ctx, int off, int from, int to, int flags) = (void *) BPF_FUNC_l4_csum_replace;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,2,0))
static void (*bpf_tail_call0)(void *ctx, void *map, int index) = (void *) BPF_FUNC_tail_call;
static unsigned long long (*bpf_get_current_pid_tgid)(void) = (void *) BPF_FUNC_get_current_pid_tgid;
static unsigned long long (*bpf_get_current_uid_gid)(void) = (void *) BPF_FUNC_get_current_uid_gid;
static int (*bpf_get_current_comm)(void *buf, int buf_size) = (void *) BPF_FUNC_get_current_comm;
static int (*bpf_clone_redirect)(void *ctx, int ifindex, int flags) = (void *) BPF_FUNC_clone_redirect;
#endif

#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,3,0))
static unsigned long long (*bpf_perf_event_read)(void *map,
						 unsigned long long flags) = (void *) BPF_FUNC_perf_event_read;
static int (*bpf_skb_get_tunnel_key)(void *ctx, void *key, int size, int flags) = (void *) BPF_FUNC_skb_get_tunnel_key;
static int (*bpf_skb_set_tunnel_key)(void *ctx, void *key, int size, int flags) = (void *) BPF_FUNC_skb_set_tunnel_key;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,4,0))
static int (*bpf_redirect)(int ifindex, int flags) = (void *) BPF_FUNC_redirect;
static int (*bpf_perf_event_output)(void *ctx, void *map,
				    unsigned long long flags, void *data,
				    int size) = (void *) BPF_FUNC_perf_event_output;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,5,0))
static int (*bpf_skb_load_bytes)(void *ctx, int off, void *to, int len) = (void *) BPF_FUNC_skb_load_bytes;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,6,0))
static int (*bpf_get_stackid)(void *ctx, void *map, int flags) = (void *) BPF_FUNC_get_stackid;
static int (*bpf_skb_get_tunnel_opt)(void *ctx, void *md, int size) = (void *) BPF_FUNC_skb_get_tunnel_opt;
static int (*bpf_skb_set_tunnel_opt)(void *ctx, void *md, int size) = (void *) BPF_FUNC_skb_set_tunnel_opt;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,8,0))
static int (*bpf_probe_write_user)(void *dst, void *src, int size) = (void *) BPF_FUNC_probe_write_user;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,9,0))
static int (*bpf_current_task_under_cgroup)(void *map, int index) = (void *) BPF_FUNC_current_task_under_cgroup;
static int (*bpf_skb_under_cgroup)(void *ctx, void *map, int index) = (void *) BPF_FUNC_skb_under_cgroup;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,10,0))
static int (*bpf_xdp_adjust_head)(void *ctx, int offset) = (void *) BPF_FUNC_xdp_adjust_head;
static int (*bpf_skb_change_head)(void *, int len, int flags) = (void *) BPF_FUNC_skb_change_head;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,11,0))
static int (*bpf_probe_read_str)(void *dst, int size, void *unsafe_ptr) = (void *) BPF_FUNC_probe_read_str;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,13,0))
static int (*bpf_setsockopt)(void *ctx, int level, int optname, void *optval,
			     int optlen) = (void *) BPF_FUNC_setsockopt;
#endif
#if (LINUX_VERSION_CODE >= KERNEL_VERSION(4,14,0))
static int (*bpf_redirect_map)(void *map, int key, int flags) = (void *) BPF_FUNC_redirect_map;
static int (*bpf_sk_redirect_map)(void *map, int key, int flags) = (void *) BPF_FUNC_sk_redirect_map;
static int (*bpf_sock_map_update)(void *map, void *key, void *value,
				  unsigned long long flags) = (void *) BPF_FUNC_sock_map_update;
#endif

#if defined(__TARGET_ARCH_x86)
	#define bpf_target_x86
	#define bpf_target_defined
#elif defined(__TARGET_ARCH_s930x)
	#define bpf_target_s930x
	#define bpf_target_defined
#elif defined(__TARGET_ARCH_arm64)
	#define bpf_target_arm64
	#define bpf_target_defined
#elif defined(__TARGET_ARCH_mips)
	#define bpf_target_mips
	#define bpf_target_defined
#elif defined(__TARGET_ARCH_powerpc)
	#define bpf_target_powerpc
	#define bpf_target_defined
#elif defined(__TARGET_ARCH_sparc)
	#define bpf_target_sparc
	#define bpf_target_defined
#else
	#undef bpf_target_defined
#endif

#ifndef bpf_target_defined
#if defined(__x86_64__)
	#define bpf_target_x86
#elif defined(__s390x__)
	#define bpf_target_s930x
#elif defined(__aarch64__)
	#define bpf_target_arm64
#elif defined(__mips__)
	#define bpf_target_mips
#elif defined(__powerpc__)
	#define bpf_target_powerpc
#elif defined(__sparc__)
	#define bpf_target_sparc
#endif
#endif

#if defined(bpf_target_x86)

#define PT_REGS_PARM1(x) ((x)->di)
#define PT_REGS_PARM2(x) ((x)->si)
#define PT_REGS_PARM3(x) ((x)->dx)
#define PT_REGS_PARM4(x) ((x)->cx)
#define PT_REGS_PARM5(x) ((x)->r8)
#define PT_REGS_RET(x) ((x)->sp)
#define PT_REGS_FP(x) ((x)->bp)
#define PT_REGS_RC(x) ((x)->ax)
#define PT_REGS_SP(x) ((x)->sp)
#define PT_REGS_IP(x) ((x)->ip)

#elif defined(bpf_target_s390x)

#define PT_REGS_PARM1(x) ((x)->gprs[2])
#define PT_REGS_PARM2(x) ((x)->gprs[3])
#define PT_REGS_PARM3(x) ((x)->gprs[4])
#define PT_REGS_PARM4(x) ((x)->gprs[5])
#define PT_REGS_PARM5(x) ((x)->gprs[6])
#define PT_REGS_RET(x) ((x)->gprs[14])
#define PT_REGS_FP(x) ((x)->gprs[11])
#define PT_REGS_RC(x) ((x)->gprs[2])
#define PT_REGS_SP(x) ((x)->gprs[15])
#define PT_REGS_IP(x) ((x)->psw.addr)

#elif defined(bpf_target_arm64)

#define PT_REGS_PARM1(x) ((x)->regs[0])
#define PT_REGS_PARM2(x) ((x)->regs[1])
#define PT_REGS_PARM3(x) ((x)->regs[2])
#define PT_REGS_PARM4(x) ((x)->regs[3])
#define PT_REGS_PARM5(x) ((x)->regs[4])
#define PT_REGS_RET(x) ((x)->regs[30])
#define PT_REGS_FP(x) ((x)->regs[29])
#define PT_REGS_RC(x) ((x)->regs[0])
#define PT_REGS_SP(x) ((x)->sp)
#define PT_REGS_IP(x) ((x)->pc)

#elif defined(bpf_target_mips)

#define PT_REGS_PARM1(x) ((x)->regs[4])
#define PT_REGS_PARM2(x) ((x)->regs[5])
#define PT_REGS_PARM3(x) ((x)->regs[6])
#define PT_REGS_PARM4(x) ((x)->regs[7])
#define PT_REGS_PARM5(x) ((x)->regs[8])
#define PT_REGS_RET(x) ((x)->regs[31])
#define PT_REGS_FP(x) ((x)->regs[30])
#define PT_REGS_RC(x) ((x)->regs[1])
#define PT_REGS_SP(x) ((x)->regs[29])
#define PT_REGS_IP(x) ((x)->cp0_epc)

#elif defined(bpf_target_powerpc)

#define PT_REGS_PARM1(x) ((x)->gpr[3])
#define PT_REGS_PARM2(x) ((x)->gpr[4])
#define PT_REGS_PARM3(x) ((x)->gpr[5])
#define PT_REGS_PARM4(x) ((x)->gpr[6])
#define PT_REGS_PARM5(x) ((x)->gpr[7])
#define PT_REGS_RC(x) ((x)->gpr[3])
#define PT_REGS_SP(x) ((x)->sp)
#define PT_REGS_IP(x) ((x)->nip)

#elif defined(bpf_target_sparc)

#define PT_REGS_PARM1(x) ((x)->u_regs[UREG_I0])
#define PT_REGS_PARM2(x) ((x)->u_regs[UREG_I1])
#define PT_REGS_PARM3(x) ((x)->u_regs[UREG_I2])
#define PT_REGS_PARM4(x) ((x)->u_regs[UREG_I3])
#define PT_REGS_PARM5(x) ((x)->u_regs[UREG_I4])
#define PT_REGS_RET(x) ((x)->u_regs[UREG_I7])
#define PT_REGS_RC(x) ((x)->u_regs[UREG_I0])
#define PT_REGS_SP(x) ((x)->u_regs[UREG_FP])

#if defined(__arch64__)
#define PT_REGS_IP(x) ((x)->tpc)
#else
#define PT_REGS_IP(x) ((x)->pc)
#endif

#endif

#ifdef bpf_target_powerpc
#define BPF_KPROBE_READ_RET_IP(ip, ctx)		({ (ip) = (ctx)->link; })
#define BPF_KRETPROBE_READ_RET_IP		BPF_KPROBE_READ_RET_IP
#elif bpf_target_sparc
#define BPF_KPROBE_READ_RET_IP(ip, ctx)		({ (ip) = PT_REGS_RET(ctx); })
#define BPF_KRETPROBE_READ_RET_IP		BPF_KPROBE_READ_RET_IP
#else
#define BPF_KPROBE_READ_RET_IP(ip, ctx)		({				\
		bpf_probe_read(&(ip), sizeof(ip), (void *)PT_REGS_RET(ctx)); })
#define BPF_KRETPROBE_READ_RET_IP(ip, ctx)	({				\
		bpf_probe_read(&(ip), sizeof(ip),				\
				(void *)(PT_REGS_FP(ctx) + sizeof(ip))); })
#endif

#endif
