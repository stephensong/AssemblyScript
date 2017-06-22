 (export "test" (func $test))
 (func $test (type $FF) (param $0 f64) (result f64)
  (return
   (get_local $0)
  )
 )
