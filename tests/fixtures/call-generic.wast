 (export "test" (func $test))
 (func $SomeClass<int>#instanceMethod<float> (type $iff) (param $0 i32) (param $1 f32) (result f32)
  (return
   (get_local $1)
  )
 )
 (func $SomeClass<long>#instanceMethod<double> (type $iFF) (param $0 i32) (param $1 f64) (result f64)
  (return
   (get_local $1)
  )
 )
 (func $SomeClass.staticMethod<float> (type $ff) (param $0 f32) (result f32)
  (return
   (get_local $0)
  )
 )
 (func $SomeClass.staticMethod<double> (type $FF) (param $0 f64) (result f64)
  (return
   (get_local $0)
  )
 )
 (func $test (type $iiv) (param $0 i32) (param $1 i32)
  (drop
   (call $SomeClass<int>#instanceMethod<float>
    (get_local $0)
    (f32.const 0.25)
   )
  )
  (drop
   (call $SomeClass<long>#instanceMethod<double>
    (get_local $1)
    (f64.const 0.5)
   )
  )
  (drop
   (call $SomeClass.staticMethod<float>
    (f32.const 0.75)
   )
  )
  (drop
   (call $SomeClass.staticMethod<double>
    (f64.const 1)
   )
  )
 )
