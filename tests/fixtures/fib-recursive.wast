 (export "test" (func $test))
 (func $test (type $ii) (param $0 i32) (result i32)
  (if
   (i32.and
    (i32.le_u
     (get_local $0)
     (i32.const 1)
    )
    (i32.const 1)
   )
   (return
    (i32.const 1)
   )
  )
  (return
   (i32.add
    (call $test
     (i32.sub
      (get_local $0)
      (i32.const 1)
     )
    )
    (call $test
     (i32.sub
      (get_local $0)
      (i32.const 2)
     )
    )
   )
  )
 )
