(module
 (type $i (func (result i32)))
 (type $iii (func (param i32 i32) (result i32)))
 (type $III (func (param i64 i64) (result i64)))
 (type $ii (func (param i32) (result i32)))
 (type $II (func (param i64) (result i64)))
 (type $FF (func (param f64) (result f64)))
 (type $ff (func (param f32) (result f32)))
 (type $FFF (func (param f64 f64) (result f64)))
 (type $fff (func (param f32 f32) (result f32)))
 (type $fi (func (param f32) (result i32)))
 (type $FI (func (param f64) (result i64)))
 (type $if (func (param i32) (result f32)))
 (type $IF (func (param i64) (result f64)))
 (type $iv (func (param i32)))
 (global $currentHeapPtr (mut i32) (i32.const 0))
 (memory $0 256)
 (export "memory" (memory $0))
 (export "allocate_memory" (func $allocate_memory))
 (export "deallocate_memory" (func $deallocate_memory))
 (func $allocate_memory (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (if
   (i32.lt_s
    (get_local $0)
    (i32.const 1)
   )
   (return
    (i32.const 0)
   )
  )
  (set_local $1
   (current_memory)
  )
  (if
   (i32.ge_u
    (get_global $currentHeapPtr)
    (get_local $1)
   )
   (drop
    (grow_memory
     (select
      (tee_local $1
       (i32.shr_s
        (i32.add
         (i32.sub
          (get_local $1)
          (get_global $currentHeapPtr)
         )
         (get_local $0)
        )
        (i32.const 16)
       )
      )
      (i32.const 1)
      (get_local $1)
     )
    )
   )
  )
  (set_local $1
   (get_global $currentHeapPtr)
  )
  (set_global $currentHeapPtr
   (i32.add
    (get_global $currentHeapPtr)
    (get_local $0)
   )
  )
  (if
   (i32.and
    (get_global $currentHeapPtr)
    (i32.const 7)
   )
   (set_global $currentHeapPtr
    (i32.add
     (i32.or
      (get_global $currentHeapPtr)
      (i32.const 7)
     )
     (i32.const 1)
    )
   )
  )
  (get_local $1)
 )
 (func $deallocate_memory (type $iv) (param $0 i32)
  (nop)
 )
)
