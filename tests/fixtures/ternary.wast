 (export "test" (func $test))
 (func $test (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (return
   (select
    (select
     (i32.const 0)
     (i32.const 1)
     (i32.and
      (i32.eq
       (get_local $0)
       (get_local $1)
      )
      (i32.const 1)
     )
    )
    (i32.and
     (i32.const -1)
     (i32.const 65535)
    )
    (i32.and
     (i32.gt_u
      (get_local $0)
      (get_local $1)
     )
     (i32.const 1)
    )
   )
  )
 )
