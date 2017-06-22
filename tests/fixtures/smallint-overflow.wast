 (export "test" (func $test))
 (func $test (type $i) (result i32)
  (return
   (i32.and
    (i32.add
     (i32.const 255)
     (i32.const 255)
    )
    (i32.const 255)
   )
  )
 )
