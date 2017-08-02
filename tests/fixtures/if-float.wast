 (export "testFloat" (func $testFloat))
 (export "testDouble" (func $testDouble))
 (export "memory" (memory $0))
 (func $testFloat (type $fv) (param $0 f32)
  (if
   (i32.trunc_s/f32
    (get_local $0)
   )
   (nop)
  )
 )
 (func $testDouble (type $Fv) (param $0 f64)
  (if
   (i32.trunc_s/f64
    (get_local $0)
   )
   (nop)
  )
 )
