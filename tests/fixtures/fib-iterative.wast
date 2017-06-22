 (export "test" (func $test))
 (func $test (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block
   (set_local $3
    (i32.const 0)
   )
   (set_local $4
    (i32.const 1)
   )
  )
  (block $break$1.1
   (set_local $1
    (i32.const 0)
   )
   (loop $continue$1.1
    (if
     (i32.and
      (i32.lt_u
       (get_local $1)
       (get_local $0)
      )
      (i32.const 1)
     )
     (block
      (block
       (set_local $2
        (i32.add
         (get_local $3)
         (get_local $4)
        )
       )
       (set_local $3
        (get_local $4)
       )
       (set_local $4
        (get_local $2)
       )
      )
      (set_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
      (br $continue$1.1)
     )
    )
   )
  )
  (return
   (get_local $4)
  )
 )
