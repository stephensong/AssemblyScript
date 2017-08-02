 (export "testInt" (func $testInt))
 (export "testFloat" (func $testFloat))
 (export "testDouble" (func $testDouble))
 (export "memory" (memory $0))
 (func $testInt (type $iiv) (param $0 i32) (param $1 i32)
  (drop
   (i32.add
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.sub
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.mul
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.div_s
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.eq
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.ne
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.gt_u
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.ge_u
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.lt_u
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.le_u
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.rem_s
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.and
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.or
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.xor
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.shl
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.shr_s
    (get_local $0)
    (get_local $1)
   )
  )
 )
 (func $testFloat (type $ffv) (param $0 f32) (param $1 f32)
  (drop
   (f32.add
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f32.sub
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f32.mul
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f32.div
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f32.eq
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f32.ne
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f32.gt
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f32.ge
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f32.lt
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f32.le
    (get_local $0)
    (get_local $1)
   )
  )
 )
 (func $testDouble (type $FFv) (param $0 f64) (param $1 f64)
  (drop
   (f64.add
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f64.sub
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f64.mul
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f64.div
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f64.eq
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f64.ne
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f64.gt
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f64.ge
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f64.lt
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (f64.le
    (get_local $0)
    (get_local $1)
   )
  )
 )
