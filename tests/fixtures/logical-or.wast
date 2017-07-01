 (export "test" (func $test))
 (func $test (type $ifi) (param $0 i32) (param $1 f32) (result i32)
  (if
   (select
    (i32.const 1)
    (f32.ne
     (get_local $1)
     (f32.const 0)
    )
    (i32.ne
     (get_local $0)
     (i32.const 0)
    )
   )
   (return
    (i32.const 1)
   )
  )
  (return
   (i32.const 0)
  )
 )
