 (export "testIntToFloat" (func $testIntToFloat))
 (export "testLongToDouble" (func $testLongToDouble))
 (export "testFloatToInt" (func $testFloatToInt))
 (export "testDoubleToLong" (func $testDoubleToLong))
 (func $testIntToFloat (type $if) (param $0 i32) (result f32)
  (return
   (f32.reinterpret/i32
    (get_local $0)
   )
  )
 )
 (func $testLongToDouble (type $IF) (param $0 i64) (result f64)
  (return
   (f64.reinterpret/i64
    (get_local $0)
   )
  )
 )
 (func $testFloatToInt (type $fi) (param $0 f32) (result i32)
  (return
   (i32.reinterpret/f32
    (get_local $0)
   )
  )
 )
 (func $testDoubleToLong (type $FI) (param $0 f64) (result i64)
  (return
   (i64.reinterpret/f64
    (get_local $0)
   )
  )
 )
