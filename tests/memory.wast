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
 (type $v (func))
 (global $heapPtr (mut i32) (i32.const 0))
 (memory $0 256)
 (export "memory" (memory $0))
 (export "alloc" (func $alloc))
 (export "free" (func $free))
 (func $alloc (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (get_global $heapPtr)
  )
  (set_global $heapPtr
   (i32.add
    (get_global $heapPtr)
    (get_local $0)
   )
  )
  (if
   (i32.and
    (get_global $heapPtr)
    (i32.const 7)
   )
   (set_global $heapPtr
    (i32.add
     (i32.or
      (get_global $heapPtr)
      (i32.const 7)
     )
     (i32.const 1)
    )
   )
  )
  (return
   (get_local $1)
  )
 )
 (func $free (type $v)
 )
)
