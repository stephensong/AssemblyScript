 (export "test" (func $test))
 (export "memory" (memory $0))
 (func $test (type $FF) (param $0 f64) (result f64)
  (return
   (get_local $0)
  )
 )
