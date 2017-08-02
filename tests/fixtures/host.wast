 (export "test" (func $test))
 (export "memory" (memory $0))
 (func $test (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (grow_memory
    (get_local $0)
   )
  )
  (return
   (current_memory)
  )
 )
