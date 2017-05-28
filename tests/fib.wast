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
 (memory $0 256)
 (export "memory" (memory $0))
 (export "fib" (func $fib))
 (func $fib (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $3
   (i32.const 0)
  )
  (set_local $1
   (i32.const 1)
  )
  (set_local $2
   (i32.const 0)
  )
  (loop $continue$1.1
   (if
    (i32.lt_s
     (get_local $2)
     (get_local $0)
    )
    (block
     (set_local $4
      (i32.add
       (get_local $3)
       (get_local $1)
      )
     )
     (set_local $3
      (get_local $1)
     )
     (set_local $1
      (get_local $4)
     )
     (set_local $2
      (i32.add
       (get_local $2)
       (i32.const 1)
      )
     )
     (br $continue$1.1)
    )
   )
  )
  (get_local $1)
 )
)
