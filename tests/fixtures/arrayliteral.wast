 (export "test" (func $test))
 (export "testNested" (func $testNested))
 (start $.start)
 (func $test (type $i) (result i32)
  (local $0 i32)
  (return
   (block (result i32)
    (set_local $0
     (call $memset
      (call $malloc
       (i32.const 24)
      )
      (i32.const 0)
      (i32.const 24)
     )
    )
    (i32.store
     (get_local $0)
     (i32.const 4)
    )
    (i32.store offset=4
     (get_local $0)
     (i32.const 4)
    )
    (i32.store offset=8
     (get_local $0)
     (i32.const 1)
    )
    (i32.store offset=12
     (get_local $0)
     (i32.const 2)
    )
    (i32.store offset=16
     (get_local $0)
     (i32.const 0)
    )
    (i32.store offset=20
     (get_local $0)
     (i32.const 3)
    )
    (get_local $0)
   )
  )
 )
 (func $testNested (type $i) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (return
   (block (result i32)
    (set_local $0
     (call $memset
      (call $malloc
       (i32.const 20)
      )
      (i32.const 0)
      (i32.const 20)
     )
    )
    (i32.store
     (get_local $0)
     (i32.const 3)
    )
    (i32.store offset=4
     (get_local $0)
     (i32.const 3)
    )
    (i32.store offset=8
     (get_local $0)
     (block (result i32)
      (set_local $1
       (call $memset
        (call $malloc
         (i32.const 24)
        )
        (i32.const 0)
        (i32.const 24)
       )
      )
      (i32.store
       (get_local $1)
       (i32.const 4)
      )
      (i32.store offset=4
       (get_local $1)
       (i32.const 4)
      )
      (i32.store offset=8
       (get_local $1)
       (i32.const 1)
      )
      (i32.store offset=12
       (get_local $1)
       (i32.const 2)
      )
      (i32.store offset=16
       (get_local $1)
       (i32.const 0)
      )
      (i32.store offset=20
       (get_local $1)
       (i32.const 3)
      )
      (get_local $1)
     )
    )
    (i32.store offset=12
     (get_local $0)
     (block (result i32)
      (set_local $2
       (call $memset
        (call $malloc
         (i32.const 12)
        )
        (i32.const 0)
        (i32.const 12)
       )
      )
      (i32.store
       (get_local $2)
       (i32.const 1)
      )
      (i32.store offset=4
       (get_local $2)
       (i32.const 1)
      )
      (i32.store offset=8
       (get_local $2)
       (i32.const 4)
      )
      (get_local $2)
     )
    )
    (i32.store offset=16
     (get_local $0)
     (block (result i32)
      (set_local $3
       (call $memset
        (call $malloc
         (i32.const 8)
        )
        (i32.const 0)
        (i32.const 8)
       )
      )
      (i32.store
       (get_local $3)
       (i32.const 0)
      )
      (i32.store offset=4
       (get_local $3)
       (i32.const 0)
      )
      (get_local $3)
     )
    )
    (get_local $0)
   )
  )
 )
 (func $.start (type $v)
  (call $malloc_init
   (i32.const 8)
  )
 )
